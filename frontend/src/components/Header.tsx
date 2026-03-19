// titulo e selector para mudar entre 'enviar' e 'receber'

interface HeaderProps {
  setView: (view: "send" | "receive") => void;
}

function Header({ setView }: HeaderProps) {
  return (
    <header>
      <h1>Telecopy</h1>

      <div>
        <ol>
          <li onClick={() => setView("send")}>Enviar</li>
          <li onClick={() => setView("receive")}>Receber</li>
        </ol>
      </div>
    </header>
  );
}

export default Header;
