import { useState } from 'react'

function Todos() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('All')

  const itemsLeft = todos.filter((todo) => !todo.completed).length
  const allCompleted = todos.length > 0 && itemsLeft === 0
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'Active') return !todo.completed
    if (filter === 'Completed') return todo.completed
    return true
  })

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedText = text.trim()
    if (!trimmedText) return

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        text: trimmedText,
        completed: false,
      },
    ])
    setText('')
  }

  function handleToggle(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function handleDelete(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  function handleClearCompleted() {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => !todo.completed),
    )
  }

  function handleToggleAll() {
    const completed = !allCompleted
    setTodos((currentTodos) =>
      currentTodos.map((todo) => ({ ...todo, completed })),
    )
  }

  return (
    <section className="mx-auto max-w-[550px]">
      <h1 className="text-center text-[80px] font-extralight text-[#b83f45]">
        todos
      </h1>

      <div className="relative bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]">
        <form onSubmit={handleSubmit}>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="h-[65px] w-full py-4 pr-4 pl-[60px] text-2xl shadow-[inset_0_-2px_1px_rgba(0,0,0,0.03)] outline-none placeholder:text-black/40 placeholder:italic focus:shadow-[0_0_2px_2px_#cf7d7d]"
            placeholder="What needs to be done?"
            aria-label="New todo"
          />
        </form>

        {todos.length > 0 && (
          <>
            <main className="relative border-t border-[#e6e6e6]">
              <input
                id="toggle-all"
                type="checkbox"
                checked={allCompleted}
                onChange={handleToggleAll}
                className="peer sr-only"
                aria-label="Mark all todos completed"
              />
              <label
                htmlFor="toggle-all"
                className="absolute -top-[66px] left-0 flex h-[65px] w-[60px] cursor-pointer items-center justify-center text-[22px] text-[#949494] peer-checked:text-[#484848]"
              >
                <span className="rotate-90">❯</span>
              </label>

              <ul>
                {visibleTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className="group relative flex items-center border-b border-[#ededed] text-2xl"
                  >
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                      aria-label={`Mark "${todo.text}" ${
                        todo.completed ? 'active' : 'completed'
                      }`}
                      className="ml-[15px] size-[30px] shrink-0 cursor-pointer accent-[#59a193]"
                    />
                    <span
                      className={`flex-1 py-[15px] pr-[60px] pl-[15px] break-all ${
                        todo.completed
                          ? 'text-[#949494] line-through'
                          : ''
                      }`}
                    >
                      {todo.text}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(todo.id)}
                      aria-label={`Delete "${todo.text}"`}
                      className="absolute right-[10px] hidden size-10 cursor-pointer text-[30px] text-[#949494] group-hover:block hover:text-[#c18585]"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </main>

            <footer className="grid h-10 grid-cols-3 items-center border-t border-[#e6e6e6] px-[15px] text-[15px]">
              <span>
                <strong className="font-light">{itemsLeft}</strong>{' '}
                {itemsLeft === 1 ? 'item' : 'items'} left
              </span>

              <ul className="flex justify-center gap-1">
                {['All', 'Active', 'Completed'].map((option) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => setFilter(option)}
                      aria-pressed={filter === option}
                      className={`cursor-pointer rounded-[3px] border px-[7px] py-[3px] ${
                        filter === option
                          ? 'border-[#b83f45]/20'
                          : 'border-transparent hover:border-[#b83f45]/10'
                      }`}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>

              {todos.some((todo) => todo.completed) ? (
                <button
                  type="button"
                  onClick={handleClearCompleted}
                  className="justify-self-end cursor-pointer hover:underline"
                >
                  Clear completed
                </button>
              ) : (
                <span />
              )}
            </footer>
          </>
        )}
      </div>
    </section>
  )
}

export default Todos
