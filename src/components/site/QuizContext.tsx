import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type QuizCtx = { open: (preselect?: string) => void; close: () => void; isOpen: boolean; preselect: string }
const Ctx = createContext<QuizCtx | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [preselect, setPre] = useState('')
  const open = useCallback((pre = '') => { setPre(pre); setOpen(true) }, [])
  const close = useCallback(() => setOpen(false), [])
  const value = useMemo(() => ({ open, close, isOpen, preselect }), [open, close, isOpen, preselect])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useQuiz() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useQuiz outside QuizProvider')
  return v
}
