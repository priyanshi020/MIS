import React from "react";
import Sidebar1 from "../components/Sidebar1";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Resignation details", "Resignation Documents"];

const Onboarding = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Sidebar1 />
      <main style={{ backgroundColor: "#F0F5FD" }}>
        <div className="p-3 mx-4">
          <h5
            className="p-4  bg-white"
            style={{ position: "relative", color: "#1B1A47" }}
          >
            Resignation request
            <span
              style={{
                position: "absolute",
                left: 30,
                bottom: 0,
                content: " ",
                display: "block",
                width: "15%",
                borderBottom: "2px solid #1B1A47",
              }}
            />
          </h5>
          <div className="d-flex justify-content-between">
            <form className="bg-white  rounded p-4 my-4 col-md-8">
              {/* Name and Email Fields */}
              <h4 className="text-center p-2">Resignation request</h4>

              <div className="row">
                <div className="col">
                  <div data-mdb-input-init className="form-outline">
                    <label
                      className="form-label fw-bold text-secondary"
                      htmlFor="form6Example1"
                    >
                      Employee Name
                    </label>
                    <input
                      type="text"
                      id="form6Example1"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      style={{ fontSize: "16px", color: "#666666" }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label
                      className="form-label fw-bold text-secondary"
                      htmlFor="form6Example1"
                    >
                      Employee ID
                    </label>
                    <input
                      type="text"
                      id="form6Example5"
                      className="form-control form-control-lg"
                      placeholder="Employee Id"
                      style={{ fontSize: "16px", color: "#666666" }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div data-mdb-input-init className="form-outline ">
                    <label
                      className="form-label fw-bold text-secondary"
                      htmlFor="form6Example1"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="form6Example5"
                      className="form-control form-control-lg"
                      placeholder=" Select Date"
                      style={{ fontSize: "16px", color: "#666666" }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label
                      className="form-label fw-bold text-secondary"
                      htmlFor="form6Example1"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      id="form6Example6"
                      className="form-control form-control-lg"
                      placeholder="Department"
                      style={{ fontSize: "16px", color: "#666666" }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div data-mdb-input-init className="form-outline mb-4">
                  <label
                    className="form-label fw-bold text-secondary"
                    htmlFor="form6Example1"
                  >
                    Reason for Resignation
                  </label>
                  <input
                    type="text"
                    id="form6Example5"
                    className="form-control form-control-xl"
                    placeholder=""
                    style={{ fontSize: "16px", color: "#666666", height: '65px' }}
                  />
                </div>
              </div>

              <DialogActions className="justify-content-start p-3">
                {/* Apply Button */}
                <Button
                  className="text-white w-25 p-2"
                  style={{ backgroundColor: "#1B1A47" }}
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1}
                >
                  Continue
                </Button>

                {/* Cancel Button */}
                <Button
                  onClick={handleBack}
                  className=" p-2 w-25 fw-bold"
                  style={{ color: "#1B1A47", backgroundColor: "#E7E7E7" }}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
              </DialogActions>
            </form>
            <div className="col-md-4 my-4">
              <div className="bg-white p-4 rounded">
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              <div className="bg-white p-4 mt-3 rounded ">
                <h5>Supporting Info</h5>
                <div style={{
            fontSize: "15px",
            color: '#a9a7a7',
            backgroundColor: '#f5f1f1',
            borderRadius: '4px',
            fontWeight: '500',
            width: '98%',
            padding: '18px 25px 15px 25px',
            marginTop: '17px',
            marginLeft: '0px',
            marginBottom: '27px'
          }}>
            <p>Probation period</p>
            <p className='text-dark'>60 days - passed</p>
          </div>
          <div style={{
            fontSize: "15px",
            color: '#a9a7a7',
            backgroundColor: '#f5f1f1',
            borderRadius: '4px',
            fontWeight: '500',
            width: '98%',
            padding: '18px 25px 15px 25px',
            marginTop: '17px',
            marginLeft: '0px',
            marginBottom: '20px'
          }}>
            <p>Suggestion notice period</p>
            <p className='text-dark'>30 days </p>
          </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Onboarding;
