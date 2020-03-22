import { Map } from 'immutable'

export default function formatVaritext(text, formatStyle, args) {
  if (text) {
    switch (formatStyle) {
      case 'currency':
        const currencyFormatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
        })
        return currencyFormatter.format(text)
      case 'decimal':
        const decimalFormatter = new Intl.NumberFormat('en-US', {
          style: 'decimal',
          minimumFractionDigits: 2,
        })
        return decimalFormatter.format(text)
      case 'integer':
        const integerFormatter = new Intl.NumberFormat('en-US', {
          style: 'decimal',
          maximumFractionDigits: 0,
        })
        return integerFormatter.format(text)
      case 'percent':
        const percentFormatter = new Intl.NumberFormat('en-US', {
          style: 'percent',
          minimumFractionDigits: 2,
        })
        return percentFormatter.format(text / 100)
      case 'uppercase':
        return text.toUpperCase()
      case 'array':
        return text.join(', ')
      case 'repeatable':
        /* Expecting strings like this:
          0, TITLE
          which get split into an index and id
        */
        let a = args.split(',')

        if (!Array.isArray(a)) return text

        const index = a[0] ? a[0].trim() : 0
        const prop = a[1] ? a[1].trim() : 'id'
        return text[index][prop]
      default:
        return text
    }
  }
}

export function getVaritextValue(varitext, varitextKey) {
  return varitext.has(varitextKey) ? varitext.get(varitextKey, null) : null
}

export function splitVaritextId(varitextId) {
  const idParts = varitextId.split(':')

  return idParts.length > 1
    ? { formId: idParts[0].trim(), varitextKey: idParts[1].trim() }
    : { formId: null, varitextKey: idParts[0].trim() }
}

export function flattenFormDataFields(formData) {
  let flatData = []

  for (let prop in formData) {
    if (typeof formData[prop] === 'object') {
      const flatGroupData = flattenFormDataFields(formData[prop])
      flatData.push(...flatGroupData)
    } else {
      flatData.push(prop)
    }
  }

  return flatData
}

export function flattenSchemaToVaritextKeys(schemaProperties) {
  let flatSchema = []

  for (let key in schemaProperties) {
    if (
      typeof schemaProperties[key] === 'object' &&
      schemaProperties[key].type === 'object'
    ) {
      const flatGroupSchema = flattenSchemaToVaritextKeys(
        schemaProperties[key].properties
      )
      flatSchema.push(...flatGroupSchema)
    } else {
      flatSchema.push(key)
    }
  }

  return flatSchema
}

export function getVaritextValuesFromFormData(formData) {
  let varitextValues = Map()

  for (let prop in formData) {
    // If an object but not an array, recursively get values.
    if (typeof formData[prop] === 'object' && !Array.isArray(formData[prop])) {
      varitextValues = varitextValues.merge(
        getVaritextValuesFromFormData(formData[prop])
      )
    } else {
      // get values for non-objects and arrays
      varitextValues = varitextValues.set(prop, formData[prop])
    }
  }

  return varitextValues
}

export function loadFormData(properties, data, varitextValues) {
  for (let prop in properties) {
    if (properties[prop].type === 'object') {
      // prop is a grouping of VARITEXT keys, need to get down to them.
      const group = properties[prop].properties
      data[prop] = loadFormData(group, data[prop], varitextValues)
    } else {
      // prop should be a VARITEXT key.
      // If we have a saved value, overwrite the default
      if (varitextValues.has(prop)) {
        data[prop] = varitextValues.get(prop)
      }
    }
  }

  return data
}
