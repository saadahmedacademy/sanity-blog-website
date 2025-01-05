import React, { useState } from 'react'
import { TextInput } from '@sanity/ui'
import { StringInputProps, set, unset } from 'sanity'
import bcrypt from 'bcryptjs'

export const PasswordInput = (props: StringInputProps) => {
  const [password, setPassword] = useState('')

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value
    setPassword(newPassword)

    if (newPassword) {
      try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        props.onChange(set(hashedPassword))
      } catch (error) {
        console.error('Error hashing password:', error)
        props.onChange(unset())
      }
    } else {
      props.onChange(unset())
    }
  }

  return (
    <TextInput
      type="password"
      value={password}
      onChange={handleChange}
      placeholder="Enter password"
    />
  )
}

