const AddSign = ({ addonClick }) => (
  <div onClick={() => addonClick()}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="black"
    >
      <path d="M12 5V19M5 12H19" stroke="black" strokeWidth="2" />
    </svg>
  </div>
);

export default AddSign;
