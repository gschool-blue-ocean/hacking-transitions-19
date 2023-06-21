import React, { useContext } from "react";
import Modal from "react-modal";
import "./StudentDetails.css";
import CohortContext from "../../context/CohortContext.jsx";
import AppointmentContext from "../../context/AppointmentContext.jsx";
Modal.setAppElement("#root");

const StudentDetail = () => {
  const {
    studentID,
    studentdata,
    branchdata,
    assignColor,
    isStudentModalOpen,
    setIsStudentModalOpen,
  } = useContext(CohortContext);

  const { tasks } = useContext(AppointmentContext);

  const appointments = {};
  const notes = {};

  tasks.forEach((task) => {
    const { id, note, student_id, appointment_date } = task;

    if (student_id === studentID && appointment_date !== null) {
      appointments[id] = {
        id: id,
        note: note,
        date: appointment_date,
      };
    } else if (student_id === studentID && appointment_date === null) {
      notes[id] = {
        id: id,
        note: note,
      };
    }
  });

  const studentName =
    studentdata && studentdata.length > 0
      ? studentdata[0].firstname + " " + studentdata[0].lastname
      : "";
  const studentStatus =
    studentdata && studentdata.length > 0 ? studentdata[0].dutystatus : "";
  const studentInstallation =
    studentdata && studentdata.length > 0 ? studentdata[0].base : "";
  const studentLocation =
    studentdata && studentdata.length > 0 ? studentdata[0].location : "";
  const studentEmail =
    studentdata && studentdata.length > 0 ? studentdata[0].email : "";
  let studentBranch = "";

  if (branchdata && branchdata.length > 0) {
    const foundBranch = branchdata.find(
      (branch) => branch.id === studentdata[0].branch_id
    );
    studentBranch = foundBranch ? foundBranch.name : "";
  }

  const formattedPhoneNumber = studentdata[0].phonenumber.replace(
    /(\d{3})(\d{3})(\d{4})/,
    "($1)-$2-$3"
  );
  const etsDate = new Date(studentdata[0].ets_date).toLocaleDateString("en-us");
  const badgeColor = assignColor(studentdata[0].ets_date);

  const modalStyle = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "fit-content",
      width: "fit-content",
      border: "1px solid",
      background: "#E0EAF8",
      overflow: "auto",
      borderRadius: "10px",
      outline: "none",
      padding: "30px",
      boxShadow: "0px 10px 20px -10px rgba(0, 0, 0, 0.75)",
    },
  };

  const getbadgeMsg = (givenDate) => {
    const today = new Date();
    const futureDate = new Date(givenDate);
    if (today >= futureDate) {
      return "Done";
    } else {
      const timeLeft = futureDate.getTime() - today.getTime();
      const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
      return `${daysLeft} days`;
    }
  };

  const badgeMsg = getbadgeMsg(studentdata[0].ets_date);

  function closeModal() {
    setIsStudentModalOpen(false);
  }

  return (
    <Modal
      isOpen={isStudentModalOpen}
      onRequestClose={closeModal}
      style={modalStyle}
    >
      <div className="modal-container">
        <table className="student-details-table">
          <thead>
            <tr>
              <th className="student-details-header" colSpan="2">
                Student Details
                <div
                  className="student-exit"
                  onClick={() => {
                    setIsStudentModalOpen(false);
                  }}
                >
                  X
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="column1">Name</td>
              <td className="column2">{studentName}</td>
            </tr>
            <tr>
              <td className="column1">Branch</td>
              <td className="column2">{studentBranch}</td>
            </tr>
            <tr>
              <td className="column1">Installation:</td>
              <td className="column2">{studentInstallation}</td>
            </tr>
            <tr>
              <td className="column1">Location:</td>
              <td className="column2">{studentLocation}</td>
            </tr>
            <tr>
              <td className="column1">Phone Number:</td>
              <td className="column2">{formattedPhoneNumber}</td>
            </tr>
            <tr>
              <td className="column1">Email:</td>
              <td className="column2">{studentEmail}</td>
            </tr>
            <tr>
              <td className="column1">ETS Date:</td>
              <td className="column2">
                <span>{etsDate}</span>
                <span
                  className="student-details-badge"
                  id={`student-badge-${badgeColor}`}
                >
                  {badgeMsg}
                </span>
              </td>
            </tr>
            <tr>
              <td className="column1 lowerLeft-cell">Duty Status</td>
              <td className="column2 lowerRight-cell">{studentStatus}</td>
            </tr>
          </tbody>
        </table>
        <span style={{ height: "20px" }}></span>
        <table className="student-details-appt-table">
          <thead>
            <tr>
              <th className="student-details-appt-header" colSpan="2">
                Appointments:
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(appointments).length > 0 ? (
              Object.entries(appointments).map(([id, appointment], index) => {
                const currentDate = new Date();
                const appointmentDate = new Date(appointment.date);
                const isStrikethrough = currentDate.getTime() > appointmentDate.getTime();
                const apptDateFormatted = new Date(appointment.date).toLocaleDateString("en-US");
                return (
                <tr key={index}>
                  <td className={`student-details-appt ${isStrikethrough ? 'strikethrough-text' : ''}`}>
                    {apptDateFormatted}
                  </td>
                  <td className="student-details-appt">{appointment.note}</td>
                </tr>
                );
              })
            ) : (
              <tr>
                <td className="student-details-appt">None.</td>
              </tr>
            )}
          </tbody>
        </table>
        <span style={{ height: "20px" }}></span>
        <table className="student-details-appt-table">
          <thead>
            <tr>
              <th className="student-details-appt-header" colSpan="2">
                Notes:
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(notes).length > 0 ? (
              Object.entries(notes).map(([id, note], index) => (
                <tr key={index}>
                  <td className="student-details-appt">{note.note}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="student-details-appt">None.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default StudentDetail;
