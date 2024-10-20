import Profile from "@/pages/profile/index"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

describe("Profile", () => {
  it("renders a heading", () => {
    // render(<Profile />)

    const heading = screen.getByRole("heading", { level: 1 })

    // expect(heading).toBeInTheDocument()
  })
})
