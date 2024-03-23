export default function Button({ style, text, onClick }) {
    return (
      <button className={style} onClick={onClick}>
        {text}
      </button>
    );
  }