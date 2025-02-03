export async function generateMetadata() {
  return {
    title: "Glossary",
    description: "Glossary of terms",
  };
}

export default async function Page() {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Glossary</h1>
      <div className="mb-10" />
      <p className="text-center">
        Some times I visit this page just to refresh my memory on some terms. I
        hope you find it useful too. If you have any suggestions, feel free to
        reach out to me.
      </p>
      <div className="mb-10" />
      <p>
        <strong>UI</strong>: User Interface
        <br />
        <em>
          The point of human-computer interaction and communication in a device.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>UX</strong>: User Experience
        <br />
        <em>
          The overall experience of a person using a product such as a website
          or computer application.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>HTTP</strong>: HyperText Transfer Protocol
        <br />
        <em>
          The protocol used for transmitting hypermedia documents, such as HTML.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>HTML</strong>: HyperText Markup Language
        <br />
        <em>
          The standard markup language for documents designed to be displayed in
          a web browser.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>CSS</strong>: Cascading Style Sheets
        <br />
        <em>
          A style sheet language used for describing the presentation of a
          document written in HTML or XML.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>API</strong>: Application Programming Interface
        <br />
        <em>
          A set of rules and protocols that allows one software application to
          interact with another.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>CLI</strong>: Command Line Interface
        <br />
        <em>A text-based interface used to interact with a computer system.</em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>DOM</strong>: Document Object Model
        <br />
        <em>
          A programming interface for web documents. It represents the page so
          that programs can change the document structure, style, and content.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>JSON</strong>: JavaScript Object Notation
        <br />
        <em>
          A lightweight data-interchange format that is easy for humans to read
          and write, and easy for machines to parse and generate.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>JavaScript</strong>: A programming language that conforms to the
        ECMAScript specification.
        <br />
        <em>
          JavaScript is high-level, often just-in-time compiled, and
          multi-paradigm.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>SPA</strong>: Single Page Application
        <br />
        <em>
          A web application that interacts with the user by dynamically
          rewriting the current page rather than loading entire new pages from a
          server.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>Zustand</strong>: A state management library for React.
        <br />
        <em>A simple and fast way to create global state in React.</em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>React</strong>: A JavaScript library for building user
        interfaces.
        <br />
        <em>React makes it painless to create interactive UIs.</em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>Tailwind CSS</strong>: A utility-first CSS framework.
        <br />
        <em>
          A utility-first CSS framework for rapidly building custom designs.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>TypeScript</strong>: A typed superset of JavaScript.
        <br />
        <em>
          TypeScript adds static types to JavaScript, making it easier to catch
          errors early and improve code quality.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>Node.js</strong>: A JavaScript runtime built on {"Chrome's"} V8
        JavaScript engine.
        <br />
        <em>
          Node.js allows you to run JavaScript on the server, enabling
          server-side scripting and building scalable network applications.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>Next.js</strong>: A React framework for production.
        <br />
        <em>
          Next.js is a React framework that enables server-side rendering,
          static site generation, and more.
        </em>
      </p>
      <div className="mb-10" />
      <p>
        <strong>SSG</strong>: Static Site Generation
        <br />
        <em>A technique that generates static HTML pages at build time.</em>
      </p>
    </div>
  );
}
