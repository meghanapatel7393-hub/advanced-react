function LoadingSpinner() {
  return (
    <button className="btn btn-primary spinner" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm"
        aria-hidden="true"
        style={{ width: "3rem", height: "3rem" }}
      ></span>
      <span role="status" style={{ fontSize: "60px" }}>
        Loading...
      </span>
    </button>
  );
}

export default LoadingSpinner;
