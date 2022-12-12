import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const BatchDropDown = ({ setBatchNumber, giveBatch }) => {
  return (
    <div className="dropdown">
      <DropdownButton size="" variant="dark" title="Select Batch Timing">
        <Dropdown.Item onClick={() => {
            setBatchNumber(1)
            giveBatch();
        }}>
          Timing: 6:00-7:00 AM
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {
            setBatchNumber(2)
            giveBatch();
        }}>
          Timing: 7:00-8:00 AM
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {
            setBatchNumber(3)
            giveBatch();
        }}>
          Timing: 8:00-9:00 AM
        </Dropdown.Item>
        <Dropdown.Item onClick={() => {
            setBatchNumber(4)
            giveBatch();
        }}>
          Timing: 5:00-6:00 PM
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default BatchDropDown;
