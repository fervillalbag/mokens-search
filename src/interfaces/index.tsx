export interface CountryType {
  code: string
  name: string
  emoji: string
  capital: string
  native: string
  continent: {
    name: string
  }
  languages: LanguageIprops[]
}

interface LanguageIprops {
  name: string
}
