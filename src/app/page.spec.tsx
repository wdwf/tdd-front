import { fireEvent, render, screen } from "@testing-library/react";

import Home from "./page";

describe("Testa a pagina principal", () => {
  it("Deve haver um titulo na página", async () => {
    render(<Home />);

    const title = await screen.findByRole("heading", {
      name: "Welcome",
    });

    expect(title).toBeInTheDocument();
  });

  it("Deve haver um subtitulo", async () => {
    render(<Home />);

    const subtitle = await screen.findByRole("heading", {
      level: 3,
      name: "Let's log you in quickly",
    });

    expect(subtitle).toBeInTheDocument();
  });

  it("Deve haver dois inputs", async () => {
    render(<Home />);

    const inputEmail = await screen.findByPlaceholderText("Enter your email");
    const inputPassword = await screen.findByPlaceholderText(
      "Enter your password"
    );

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  it("Deve haver um botão", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");

    expect(button.textContent).toContain("Login");
  });

  it("Deve aparecer uma mensagem de erro quando clicar no botão com o input de email vazio", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");

    const inputPassword = await screen.findByPlaceholderText(
      "Enter your password"
    );

    fireEvent.change(inputPassword, {
      target: {
        value: "12356",
      },
    });

    fireEvent.click(button);

    expect(
      screen.queryByText("E-mail e senha são obrigatórios!")
    ).toBeInTheDocument();
  });

  it("Deve aparecer uma mensagem de erro quando clicar no botão com o input de password vazio", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");

    const inputEmail = await screen.findByPlaceholderText("Enter your email");

    fireEvent.change(inputEmail, {
      target: {
        value: "test@email.com",
      },
    });

    screen.debug();
    fireEvent.click(button);

    expect(
      screen.queryByText("E-mail e senha são obrigatórios!")
    ).toBeInTheDocument();
  });

  it("Deve aparecer uma mensagem de erro quando clicar no botão com os inputs vazios", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");
    fireEvent.click(button);

    expect(
      screen.queryByText("E-mail e senha são obrigatórios!")
    ).toBeInTheDocument();
  });

  it("Não deve fazer login com credenciais inválidas", async () => {
    render(<Home />);

    const button = await screen.findByRole("button");

    const inputEmail = await screen.findByPlaceholderText("Enter your email");

    fireEvent.change(inputEmail, {
      target: {
        value: "test@email.com",
      },
    });

    const inputPassword = await screen.findByPlaceholderText(
      "Enter your password"
    );

    fireEvent.change(inputPassword, {
      target: {
        value: "123456",
      },
    });

    screen.debug();
    fireEvent.click(button);

    expect(screen.queryByText("E-mail e senha inválidos!")).toBeInTheDocument();
  });

  it("Deve haver um Titulo LOGIN", async () => {
    render(<Home />);

    const title = await screen.getByRole("heading", {
      name: "LOGIN",
    });

    expect(title).toBeInTheDocument();
  });
});

