interface LanguageProps {
  language?: string
}

const Language = ({ language }: LanguageProps) => {
  return (
    <div>
      <h1>Language {language}</h1>{' '}
    </div>
  )
}

export default Language
