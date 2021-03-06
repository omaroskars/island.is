import {
  linkResolver,
  typeResolver,
  LinkType,
  routesTemplate,
} from './useLinkResolver'

describe('Link resolver', () => {
  it('should return correct path to type with out variable', () => {
    const nextLinks = linkResolver('adgerdirfrontpage', [], 'is')
    expect(nextLinks).toEqual({
      as: '/covid-adgerdir',
      href: '/covid-adgerdir',
    })
  })

  it('should return correct path to type with variable', () => {
    const nextLinks = linkResolver('lifeeventpage', ['cat'], 'is')
    expect(nextLinks).toEqual({
      as: '/lifsvidburdur/cat',
      href: '/lifsvidburdur/[slug]',
    })
  })

  it('should return correct path for all locales', () => {
    const nextIsLinks = linkResolver('news', ['hundur'], 'is')
    expect(nextIsLinks).toEqual({
      as: '/frett/hundur',
      href: '/frett/[slug]',
    })

    const nextEnLinks = linkResolver('news', ['dog'], 'en')
    expect(nextEnLinks).toEqual({
      as: '/en/news/dog',
      href: '/en/news/[slug]',
    })
  })

  it('should direct unresolvable links to 404', () => {
    const nextEnLink = linkResolver('page', [], 'en')
    expect(nextEnLink).toEqual({
      as: '/404',
      href: '/404',
    })
  })

  it('should handle content type with uppercase', () => {
    const nextLinks = linkResolver('lifeEventPage' as LinkType, ['cat'], 'is')
    expect(nextLinks).toEqual({
      as: '/lifsvidburdur/cat',
      href: '/lifsvidburdur/[slug]',
    })
  })

  it('should handle wrong content type ', () => {
    const nextLinks = [
      linkResolver('dogPark' as LinkType, [''], 'is'),
      linkResolver('dogPark' as LinkType, ['cat'], 'is'),
    ]
    nextLinks.map((link) => {
      expect(link).toEqual({
        as: '/404',
        href: '/404',
      })
    })
  })

  it('should handle content type as empty string', () => {
    const nextLinks = linkResolver('' as LinkType, [], 'is')
    expect(nextLinks).toEqual({
      as: '/404',
      href: '/404',
    })
  })

  it('should handle content type as undefined', () => {
    const nextLinks = linkResolver(undefined as LinkType, [], 'is')
    expect(nextLinks).toEqual({
      as: '/404',
      href: '/404',
    })
  })

  it('should return external urls as next links objects', () => {
    const nextLinks = linkResolver(
      'linkurl' as LinkType,
      ['https://example.com'],
      'is',
    )
    expect(nextLinks).toEqual({
      as: 'https://example.com',
      href: 'https://example.com',
    })
  })

  it('should have no path repetition', () => {
    const types = Object.values(routesTemplate).reduce(
      (types, templateObject) => {
        if (templateObject.en) {
          types.push(templateObject.en)
        }
        if (templateObject.is) {
          types.push(templateObject.is)
        }
        return types
      },
      [],
    )
    expect(types.length === new Set(types).size).toBeTruthy()
  })

  it('should have no link type repetition', () => {
    const types = Object.keys(routesTemplate).map((type) => type.toLowerCase())
    expect(types.length === new Set(types).size).toBeTruthy()
  })
})

describe('Type resolver', () => {
  it('Should find path with variables', () => {
    const types = typeResolver('/flokkur/mycustomcategory')
    expect(types).toEqual({
      type: 'articlecategory',
      locale: 'is',
    })
  })

  it('Should match path without variables', () => {
    const types = typeResolver('/frett')
    expect(types).toEqual({
      type: 'newsoverview',
      locale: 'is',
    })
  })

  it('Should support multiple locales', () => {
    const typesIs = typeResolver('/frett/mycustomnews')
    expect(typesIs).toEqual({
      type: 'news',
      locale: 'is',
    })

    const typesEn = typeResolver('/en/news/mycustomnews')
    expect(typesEn).toEqual({
      type: 'news',
      locale: 'en',
    })
  })

  it('Should handle undefined', () => {
    const types = typeResolver(undefined)
    expect(types).toBeNull()
  })

  it('Should handle empty path', () => {
    const types = typeResolver('')
    expect(types).toBeNull()
  })

  it('Should ignore dynamic paths', () => {
    const types = typeResolver('/frett/mycustomnews', true)
    expect(types).toEqual({
      type: 'newsoverview',
      locale: 'is',
    })
  })
})
