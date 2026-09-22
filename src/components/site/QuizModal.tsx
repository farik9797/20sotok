import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Quiz } from './Quiz'
import { useQuiz } from './QuizContext'

export function QuizModal() {
  const { isOpen, close, preselect } = useQuiz()
  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[720px] overflow-auto rounded-none border-0 bg-transparent p-0 shadow-none sm:max-w-[720px] [&>button]:hidden">
        <DialogTitle className="sr-only">Калькулятор бюджета проекта</DialogTitle>
        {isOpen && <Quiz key={preselect} preselect={preselect} onClose={close} />}
      </DialogContent>
    </Dialog>
  )
}
