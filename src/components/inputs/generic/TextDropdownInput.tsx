import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react"



/**
 * Option for a Switch
 */
export interface TextDropdownOption {
  value: string,
  label: string,
}


/**
 * Generic switch for the app
 */
export const TextDropdownInput = ({
  value,
  options,
  placeholder,
  onChange,
}: {
  value?: string,
  options?: TextDropdownOption[],
  placeholder?: string,
  onChange?: (value: string | null) => void,
}) => {



  // state
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)


  const filteredOptions = useMemo(() => {
    return options?.filter(option => {
      return option.label.toLowerCase().includes(text?.toLowerCase() ?? "")
    })
  }, [options, text])

  const selected = useMemo(() => {
    return options?.find(option => {
      return option.value === value
    })
  }, [options, value])


  useEffect(() => {
    setText(selected?.label ?? "")
  }, [selected])


  const selectOption = useCallback((value: string | null) => {
    const option = value ? options?.find(option => {
      return option.value === value
    }) : null
    console.log(option)
    setText(option?.label ?? "")
    onChange?.(option?.value ?? null)
    setOpen(false)
  }, [onChange, options])

  const onFocus = useCallback(() => {
    setOpen(true)
  }, [])

  const onBlur = useCallback(() => {
    setOpen(false)
  }, [])


  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Tab":
      case "Enter":
        if (filteredOptions) {
          const newSelected = text === "" ? null : filteredOptions[0]?.value ?? null
          console.log(text)
          console.log(newSelected)
          selectOption(newSelected)
        }
        inputRef.current?.blur()
        break
      case "Escape":
        inputRef.current?.blur()
        break
    }
  }, [text, selectOption, filteredOptions])

  return (
    <div className="relative overflow-visible">
      <div>
        <input
          type="text"
          onFocus={onFocus}
          onBlur={onBlur}
          className={`border-b px-1`}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          ref={inputRef}
          value={text}
          onClick={() => inputRef.current?.select()}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {open && options && (
        <div className="absolute mt-1 z-50 border bg-white rounded px-1 py-0.5 shadow w-full max-h-96 overflow-y-scroll">
          {filteredOptions?.map(option => {
            return (
              <Fragment key={option.value}>
                <div
                  className="cursor-pointer hover:bg-gray-200"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => selectOption(option.value)}
                >
                  {option.label}
                </div>
              </Fragment>
            )
          })}
        </div>
      )}
    </div>

  )
}