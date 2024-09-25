import { useState } from 'react';
import Header from './components/Header';
import initialEmails from './data/emails';
import './styles/App.css';

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideEmails, setHideEmails] = useState(false);

  const toggleRead = (id) => {
    setEmails((prevEmails) => 
      prevEmails.map((email) => email.id === id ? {...email, read: !email.read} : email
       )
    );
  }

const toggleStar = (id) => {
  setEmails((prevEmails) =>
    prevEmails.map((email) => email.id === id ? {...email, starred: !email.starred} : email
    )
  );
  }

  const filterEmails = hideEmails ? emails.filter(email => !email.read) : emails;

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
          >
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className="item"
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter(email => email.starred).length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideEmails}
              onChange={() => setHideEmails(!hideEmails)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{filterEmails.map((email) => (
          <li key={email.id} className={`email ${email.read ? 'read' : 'unread'}`}>
          <input
          type="checkbox"
          className="select-checkbox"
          checked={email.read}
          onChange={() => toggleRead(email.id)}
          />
          <input
          type="checkbox"
          className='star-checkbox'
          checked={email.starred}
          onChange={() => toggleStar(email.id)}
          />
          <div className='sender'>{email.sender}</div>
          <div className="title">{email.title}</div>
          </li>
      ))}
      </main>
    </div>
  )

}

export default App;
