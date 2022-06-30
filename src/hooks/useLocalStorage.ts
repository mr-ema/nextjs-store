import { useEffect, useState } from 'react'

export default function useLocalStorage<Type>(key: string, fallbackState: Type): any {
  const [value, setValue] = useState<Type>( fallbackState )

  useEffect(() => {
    // check if window exits (client-side)
    if (typeof window !== 'undefined') {
      try {
        const value = JSON.parse( localStorage.getItem(key) ) ?? fallbackState
        if(typeof value !== 'undefined')  setValue( value )

      }catch(err) {
        alert('Nice Try')
        setValue( fallbackState )
      }
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