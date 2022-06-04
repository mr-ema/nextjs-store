import { useEffect, useState } from 'react'

export default function useLocalStorage<Type>(key: string, fallbackState: Type): any {
  const [value, setValue] = useState<Type>( fallbackState )

  useEffect(() => {
    // check if window exits (client-side)
    if (typeof window !== 'undefined') {
      setValue( JSON.parse( localStorage.getItem(key) ) ?? fallbackState )
    }
  }, [])

  useEffect(() => {
    // check if window exits (client-side)
    if (typeof window !== 'undefined') {
      localStorage.setItem( key, JSON.stringify(value) )
    }
  }, [value, key])

  return [value, setValue]
}