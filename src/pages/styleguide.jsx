// This is template with list of all the books
// jenahajek.com/bookshelf

import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default () => {
  return (
    <Layout>
      <SEO title="Styleguide" />
      <div className="styleguide user-content">
        <h1 className="type-h0">
          Slightly longer Heading 0 than usual for testing purposes
        </h1>
        <h1>Slightly longer Heading 1 than usual for testing purposes</h1>
        <p>
          A paragraph (from the Greek paragraphos, “to write beside” or “written
          beside”) is a self-contained unit of a discourse in writing dealing
          with a particular point or idea. A paragraph consists of one or more
          sentences. Though not required by the syntax of any language,
          paragraphs are usually an expected part of formal writing, used to
          organize longer prose.
        </p>
        <h2>Slightly longer Heading 2 than usual for testing purposes</h2>
        <p>
          A paragraph (from the Greek paragraphos, “to write beside” or “written
          beside”) is a self-contained unit of a discourse in writing dealing
          with a particular point or idea. A paragraph consists of one or more
          sentences. Though not required by the syntax of any language,
          paragraphs are usually an expected part of formal writing, used to
          organize longer prose.
        </p>
        <h3>Slightly longer Heading 3 than usual for testing purposes</h3>
        <p>
          A paragraph (from the Greek paragraphos, “to write beside” or “written
          beside”) is a self-contained unit of a discourse in writing dealing
          with a particular point or idea. A paragraph consists of one or more
          sentences. Though not required by the syntax of any language,
          paragraphs are usually an expected part of formal writing, used to
          organize longer prose.
        </p>
        <h4>Slightly longer Heading 4 than usual for testing purposes</h4>
        <p>
          A paragraph (from the Greek paragraphos, “to write beside” or “written
          beside”) is a self-contained unit of a discourse in writing dealing
          with a particular point or idea. A paragraph consists of one or more
          sentences. Though not required by the syntax of any language,
          paragraphs are usually an expected part of formal writing, used to
          organize longer prose.
        </p>
        <h5>Slightly longer Heading 5 than usual for testing purposes</h5>
        <p>
          A paragraph (from the Greek paragraphos, “to write beside” or “written
          beside”) is a self-contained unit of a discourse in writing dealing
          with a particular point or idea. A paragraph consists of one or more
          sentences. Though not required by the syntax of any language,
          paragraphs are usually an expected part of formal writing, used to
          organize longer prose.
        </p>
        <h6>Slightly longer Heading 6 than usual for testing purposes</h6>
        <p>
          A paragraph (from the Greek paragraphos, “to write beside” or “written
          beside”) is a self-contained unit of a discourse in writing dealing
          with a particular point or idea. A paragraph consists of one or more
          sentences. Though not required by the syntax of any language,
          paragraphs are usually an expected part of formal writing, used to
          organize longer prose.
        </p>

        <h6>Check for margins between successive headings</h6>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>

        <h2>Lists</h2>

        <h3>Unordered List</h3>
        <ul>
          <li>
            <strong>Etiam ante sem,</strong> porta a porttitor ut, varius varius
            metus.
          </li>
          <li>
            <strong>Nunc eu felis</strong> quis metus volutpat pellentesque.
          </li>
          <li>
            <strong>Duis gravida</strong> tincidunt enim sed cursus.
          </li>
          <li>
            <strong>Nunc eu felis</strong> quis metus volutpat pellentesque.
          </li>
          <li>
            <strong>Duis gravida</strong> tincidunt enim sed cursus.
          </li>
        </ul>

        <h3>Ordered List</h3>
        <ol>
          <li>
            <strong>Etiam ante sem,</strong> porta a porttitor ut, varius varius
            metus.
          </li>
          <li>
            <strong>Nunc eu felis</strong> quis metus volutpat pellentesque.
          </li>
          <li>
            <strong>Duis gravida</strong> tincidunt enim sed cursus.
          </li>
          <li>
            <strong>Nunc eu felis</strong> quis metus volutpat pellentesque.
          </li>
          <li>
            <strong>Duis gravida</strong> tincidunt enim sed cursus.
          </li>
        </ol>

        <h3>Definition list</h3>
        <dl>
          <dt>Definition List Title</dt>
          <dd>This is a definition list division.</dd>
        </dl>

        <h2>Blockquotes</h2>
        <p>
          A paragraph (from the Greek paragraphos, “to write beside” or “written
          beside”) is a self-contained unit of a discourse in writing dealing
          with a particular point or idea. A paragraph consists of one or more
          sentences. Though not required by the syntax of any language,
          paragraphs are usually an expected part of formal writing, used to
          organize longer prose.
        </p>
        <blockquote>
          <p>
            A block quotation (also known as a long quotation or extract) is a
            quotation in a written document, that is set off from the main text
            as a paragraph, or block of text.
          </p>
          <p>
            It is typically distinguished visually using indentation and a
            different typeface or smaller size quotation. It may or may not
            include a citation, usually placed at the bottom.
          </p>
          <cite>
            <a href="#">Said no one, ever.</a>
          </cite>
        </blockquote>
        <p>
          A paragraph (from the Greek paragraphos, “to write beside” or “written
          beside”) is a self-contained unit of a discourse in writing dealing
          with a particular point or idea. A paragraph consists of one or more
          sentences. Though not required by the syntax of any language,
          paragraphs are usually an expected part of formal writing, used to
          organize longer prose.
        </p>

        <h2>Inline elements</h2>
        <p>
          <a href="#">This is a text link</a>.
        </p>
        <p>
          <strong>Strong is used to indicate strong importance.</strong>
        </p>
        <p>
          <em>This text has added emphasis.</em>
        </p>
        <p>
          <del>This text is deleted</del> and <ins>This text is inserted</ins>.
        </p>
        <p>
          Superscript<sup>®</sup>.
        </p>
        <p>
          Subscript for things like H<sub>2</sub>O.
        </p>
        <p>
          Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>
        </p>
        <p>
          <q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">
            This text is a short inline quotation.
          </q>
        </p>
        <p>
          <cite>This is a citation.</cite>
        </p>
        <p>
          The <dfn>dfn element</dfn> indicates a definition.
        </p>
        <p>
          The <mark>mark element</mark> indicates a highlight.
        </p>
        <p>
          The time element:&nbsp;
          <time dateTime="2013-04-06T12:32+00:00">2 weeks ago</time>
        </p>

        <h2>Horizontal rules</h2>
        <hr />

        <h2>Code</h2>
        <p>
          <strong>Keyboard input:</strong> <kbd>Cmd</kbd>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat ad
          esse <kbd>Cmd</kbd> + <kbd>U</kbd> expedita facere saepe hic. Adipisci
          quia odio consequuntur, minus laudantium repellendus aut repellat
          cumque dolorum eum consectetur porro.
        </p>
        <p>
          <strong>Inline code:</strong> <code>&lt;div&gt;code&lt;/div&gt;</code>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat ad
          esse <code>laboriosam.jsx</code> expedita facere saepe hic. Adipisci
          quia odio consequuntur, minus laudantium repellendus aut repellat
          cumque dolorum eum consectetur porro.
        </p>

        {/* <h2>Images</h2>
                <figure>
                    <img
                        src="{{ assets.images }}illust/sample.jpg"
                        width="400"
                        height="250"
                        alt=""
                    />
                    <figcaption>Image description</figcaption>
                </figure> */}
      </div>
    </Layout>
  );
};
