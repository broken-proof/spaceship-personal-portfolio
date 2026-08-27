

function Button({ label, image }) {


  return (
    <button style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <img src={image} style={{ maxWidth: 100 }}></img>
      {label}

    </button>
  )
}

export default Button;