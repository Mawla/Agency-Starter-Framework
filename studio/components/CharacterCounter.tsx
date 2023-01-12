// CustomStringInput.tsx
import {useCallback} from 'react'
import {Box, Stack, Text, TextInput} from '@sanity/ui'
import {StringInputProps, set, unset} from 'sanity'

export function CharacterCounter(props: StringInputProps) {
  const {onChange, value = '', elementProps} = props
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      onChange(event.currentTarget.value ? set(event.currentTarget.value) : unset()),
    [onChange]
  )
  return (
    <Stack space={3}>
      <TextInput {...elementProps} onChange={handleChange} value={value} />
      <Text size={1}>Characters: {value?.length || 0}</Text>
    </Stack>
  )
}
