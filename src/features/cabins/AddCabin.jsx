import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button variation="primary" size="medium">
          Add New Cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button
//         onClick={() => setIsOpenModal((show) => !show)}
//         variation="primary"
//         size="medium">
//         Add new cabins
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           {<CreateCabinForm onClose={() => setIsOpenModal(false)} />}
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
