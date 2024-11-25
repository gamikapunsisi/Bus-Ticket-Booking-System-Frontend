import React, { useEffect, useState } from "react";
import Input from "../../components/Form/Input";
import { useInput } from "../../hooks/use-input";
import {
  isFloatNumber,
  isNotEmpty,
  isNotRequired,
} from "../../validation/Validations";
import { GoSync } from "react-icons/go";
import DropDown from "../../components/Form/DropDown";
import { fetchAllRoutes } from "../../services/apiService";
import { useOutletContext } from "react-router-dom";

const BusAdd = () => {

  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);

  //   {
  //     "busId": "NA-1237",
  //     "busName": "Nirmal Express",
  //     "busType": "Normal",
  //     "busOwner": "Nirmal",
  //     "busOwnerContact": "0783040566",
  //     "busOwnerEmail": "nirmal@gmail.com",
  //     "busOwnerAddress": "No 123, Kandy Road, Kandy",
  //     "busOwnerNIC": "123456789V",
  //     "totalSeats": 50,
  //     "routeId": "6739f5d7f6b236ac5d03cf21",
  //     "seatPosition": {
  //         "leftPosition": {
  //             "numberOfSeatsPerRow": 2,
  //             "numberOfRows": 9
  //         },
  //         "rightPosition": {
  //             "numberOfSeatsPerRow": 3,
  //             "numberOfRows": 9
  //         },
  //         "backPosition": {
  //             "numberOfSeatsPerRow": 5,
  //             "numberOfRows": 1
  //         }
  //     }
  // }

  useEffect(() => {
    // fetch road routes
    const fetchRoutes = async () => {
      try {
        const response = await fetchAllRoutes();
        setRoutes(response.data.busRoutes);
      } catch (error) {
        console.log(error);
      }
    }

    fetchRoutes();
  }, []);

  console.log('routes', routes);

  const [busTypes, setBusTypes] = useState([
    { id: 1, name: "Normal" },
    { id: 2, name: "AC" },
  ]);

  const {
    value: busId,
    handleInputChange: handleBusIdChange,
    handleInputBlur: handleBusIdBlur,
    hasError: busIdHasError,
    setValue: setBusId,
    reset: resetBusId,
  } = useInput("", isNotEmpty);

  const {
    value: busName,
    handleInputChange: handleBusNameChange,
    handleInputBlur: handleBusNameBlur,
    hasError: busNameHasError,
    setValue: setBusName,
    reset: resetBusName,
  } = useInput("", isNotRequired);

  const {
    value: busType,
    handleInputChange: handleBusTypeChange,
    handleInputBlur: handleBusTypeBlur,
    hasError: busTypeHasError,
    setValue: setBusType,
    reset: resetBusType,
  } = useInput("", isNotEmpty);

  const {
    value: busOwner,
    handleInputChange: handleBusOwnerChange,
    handleInputBlur: handleBusOwnerBlur,
    hasError: busOwnerHasError,
    setValue: setBusOwner,
    reset: resetBusOwner,
  } = useInput("", isNotEmpty);

  const {
    value: busOwnerContact,
    handleInputChange: handleBusOwnerContactChange,
    handleInputBlur: handleBusOwnerContactBlur,
    hasError: busOwnerContactHasError,
    setValue: setBusOwnerContact,
    reset: resetBusOwnerContact,
  } = useInput("", isNotEmpty);

  const {
    value: busOwnerEmail,
    handleInputChange: handleBusOwnerEmailChange,
    handleInputBlur: handleBusOwnerEmailBlur,
    hasError: busOwnerEmailHasError,
    setValue: setBusOwnerEmail,
    reset: resetBusOwnerEmail,
  } = useInput("", isNotEmpty);

  const {
    value: busOwnerAddress,
    handleInputChange: handleBusOwnerAddressChange,
    handleInputBlur: handleBusOwnerAddressBlur,
    hasError: busOwnerAddressHasError,
    setValue: setBusOwnerAddress,
    reset: resetBusOwnerAddress,
  } = useInput("", isNotEmpty);

  const {
    value: busOwnerNIC,
    handleInputChange: handleBusOwnerNICChange,
    handleInputBlur: handleBusOwnerNICBlur,
    hasError: busOwnerNICHasError,
    setValue: setBusOwnerNIC,
    reset: resetBusOwnerNIC,
  } = useInput("", isNotEmpty);

  const {
    value: totalSeats,
    handleInputChange: handleTotalSeatsChange,
    handleInputBlur: handleTotalSeatsBlur,
    hasError: totalSeatsHasError,
    setValue: setTotalSeats,
    reset: resetTotalSeats,
  } = useInput("", isNotEmpty);

  const {
    value: routeName,
    id: routeId,
    handleInputChange: handleRouteIdChange,
    handleInputBlur: handleRouteIdBlur,
    hasError: routeIdHasError,
    setValue: setRouteId,
    reset: resetRouteId,
  } = useInput("", isNotEmpty);

  const [seatPosition, setSeatPosition] = useState({
    leftPosition: {
      numberOfSeatsPerRow: null,
      numberOfRows: null,
    },
    rightPosition: {
      numberOfSeatsPerRow: null,
      numberOfRows: null,
    },
    backPosition: {
      numberOfSeatsPerRow: null,
      numberOfRows: null,
    },
  });

  const hasError = false;

  const hasEmptyFields =
    !busId ||
    !busName ||
    !busType ||
    !busOwner ||
    !busOwnerContact ||
    !busOwnerEmail ||
    !busOwnerAddress ||
    !busOwnerNIC ||
    !totalSeats;

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
  };

  console.log('routeId', routeId, routeName);

  return (
    <div className=" font-sans">
      <h1 className=" text-xl font-bold mb-4">Register New Bus</h1>
      <div className=" ml-5">
        <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
          <div className="flex flex-col gap-4 min-h-[400px] ">
            <div className=" grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <Input
                id="busId"
                name="busId"
                type="text"
                placeholder="Ex: NA-1237"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Bus Register No <span className="text-red-600">*</span>
                  </>
                }
                value={busId}
                onChange={handleBusIdChange}
                onBlur={handleBusIdBlur}
                error={busIdHasError && "Please enter valid bus register no"}
              />
              <Input
                id="busName"
                name="busName"
                type="text"
                placeholder="Ex: Nirmal Express"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Bus Name <span className="text-red-600">*</span>
                  </>
                }
                value={busName}
                onChange={handleBusIdChange}
                onBlur={handleBusIdBlur}
                error={busIdHasError && ""}
              />
              <DropDown
                id="busType"
                name="busType"
                type="text"
                placeholder="Ex: Normal"
                containerStyle={`w-full lg:w-[350px] h-[40px]`}
                dropdownDivStyle={`w-full lg:w-[350px] h-[40px]`}
                dropdownStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Bus Type <span className="text-red-600">*</span>
                  </>
                }
                options={busTypes}
                defaultOption="Select bus type"
                idKey="id"
                valueKey="name"
                value={busType}
                onChange={handleBusTypeChange}
                onBlur={handleBusTypeBlur}
                error={busTypeHasError && "Please enter valid bus type"}
              />
            </div>
            <div className=" grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <Input
                id="busOwner"
                name="busOwner"
                type="text"
                placeholder="Ex: Nirmal"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Bus Owner <span className="text-red-600">*</span>
                  </>
                }
                value={busOwner}
                onChange={handleBusOwnerChange}
                onBlur={handleBusOwnerBlur}
                error={busOwnerHasError && "Please enter valid bus owner"}
              />
              <Input
                id="busOwnerNIC"
                name="busOwnerNIC"
                type="text"
                placeholder="Ex: 123456789V"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Bus Owner NIC <span className="text-red-600">*</span>
                  </>
                }
                value={busOwnerNIC}
                onChange={handleBusOwnerNICChange}
                onBlur={handleBusOwnerNICBlur}
                error={
                  busOwnerNICHasError && "Please enter valid bus owner NIC"
                }
              />
              <Input
                id="busOwnerContact"
                name="busOwnerContact"
                type="text"
                placeholder="Ex: 0783040566"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Bus Owner Contact <span className="text-red-600">*</span>
                  </>
                }
                value={busOwnerContact}
                onChange={handleBusOwnerContactChange}
                onBlur={handleBusOwnerContactBlur}
                error={
                  busOwnerContactHasError &&
                  "Please enter valid bus owner contact"
                }
              />
            </div>
            <div className=" grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <Input
                id="busOwnerEmail"
                name="busOwnerEmail"
                type="text"
                placeholder="Ex: mcr@gmail.com"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Bus Owner Email <span className="text-red-600">*</span>
                  </>
                }
                value={busOwnerEmail}
                onChange={handleBusOwnerEmailChange}
                onBlur={handleBusOwnerEmailBlur}
                error={
                  busOwnerEmailHasError && "Please enter valid bus owner email"
                }
              />
              <Input
                id="busOwnerAddress"
                name="busOwnerAddress"
                type="text"
                placeholder="Ex: No 123, Kandy Road, Kandy"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Bus Owner Address <span className="text-red-600">*</span>
                  </>
                }
                value={busOwnerAddress}
                onChange={handleBusOwnerAddressChange}
                onBlur={handleBusOwnerAddressBlur}
                error={
                  busOwnerAddressHasError &&
                  "Please enter valid bus owner address"
                }
              />
              <Input
                id="totalSeats"
                name="totalSeats"
                type="number"
                placeholder="Ex: 50"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Total Seats <span className="text-red-600">*</span>
                  </>
                }
                value={totalSeats}
                onChange={handleTotalSeatsChange}
                onBlur={handleTotalSeatsBlur}
                error={totalSeatsHasError && "Please enter valid total seats"}
              />
            </div>
            <div className=" grid grid-cols-1 gap-3  md:grid-cols-2">
              <DropDown
                id="routeId"
                name="routeName"
                type="text"
                placeholder="Ex: Kandy - Colombo"
                containerStyle={`w-full lg:w-[350px] h-[40px]`}
                dropdownDivStyle={`w-full lg:w-[350px] h-[40px]`}
                dropdownStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                   Bus Route <span className="text-red-600">*</span>
                  </>
                }
                options={routes}
                defaultOption="Select route"
                idKey="_id"
                valueKey="routeName"
                value={routeId}
                onChange={handleRouteIdChange}
                onBlur={handleRouteIdBlur}
                error={routeIdHasError && "Please enter valid route"}
              />
            </div>
            <div className=" mt-8">
              <h1 className="text-lg font-bold  mb-2">Seat Position</h1>
              <div className=" grid grid-cols-3">
                <div>
                  <p className=" text-gray-700 mb-2">Left Seat Position</p>
                  <div className=" grid grid-cols-2">
                    <Input
                      id="leftPosition"
                      name="leftPosition"
                      type="number"
                      placeholder="Ex: 2"
                      inputStyle={`w-full lg:w-[120px] h-[40px]`}
                      label={
                        <>
                          Number of Seats Per Row{" "}
                          <span className="text-red-600">*</span>
                        </>
                      }
                      value={seatPosition.leftPosition.numberOfSeatsPerRow}
                      labelStyle="text-sm"
                      onChange={handleBusTypeChange}
                      onBlur={handleBusTypeBlur}
                      error={busTypeHasError && ""}
                    />
                    <Input
                      id="numberOfRows"
                      name="numberOfRows"
                      type="number"
                      placeholder="Ex: 9"
                      inputStyle={`w-full lg:w-[120px] h-[40px]`}
                      label={
                        <>
                          Number of Rows <span className="text-red-600">*</span>
                        </>
                      }
                      value={seatPosition.leftPosition.numberOfRows}
                      onChange={handleBusTypeChange}
                      onBlur={handleBusTypeBlur}
                      error={busTypeHasError && ""}
                      labelStyle="text-sm"
                    />
                  </div>
                </div>
                <div>
                  <p className=" text-gray-700 mb-2">Right Seat Position</p>
                  <div className=" grid grid-cols-2">
                    <Input
                      id="rightPosition"
                      name="rightPosition"
                      type="number"
                      placeholder="Ex: 3"
                      inputStyle={`w-full lg:w-[120px] h-[40px]`}
                      label={
                        <>
                          Number of Seats Per Row{" "}
                          <span className="text-red-600">*</span>
                        </>
                      }
                      value={seatPosition.rightPosition.numberOfSeatsPerRow}
                      labelStyle="text-sm"
                      onChange={handleBusTypeChange}
                      onBlur={handleBusTypeBlur}
                      error={busTypeHasError && ""}
                    />
                    <Input
                      id="numberOfRows"
                      name="numberOfRows"
                      type="number"
                      placeholder="Ex: 9"
                      inputStyle={`w-full lg:w-[120px] h-[40px]`}
                      label={
                        <>
                          Number of Rows <span className="text-red-600">*</span>
                        </>
                      }
                      value={seatPosition.rightPosition.numberOfRows}
                      onChange={handleBusTypeChange}
                      onBlur={handleBusTypeBlur}
                      error={busTypeHasError && ""}
                      labelStyle="text-sm"
                    />
                  </div>
                </div>
                <div>
                  <p className=" text-gray-700 mb-2">Back Seat Position</p>
                  <div className=" grid grid-cols-2">
                    <Input
                      id="backPosition"
                      name="backPosition"
                      type="number"
                      placeholder="Ex: 5"
                      inputStyle={`w-full lg:w-[120px] h-[40px]`}
                      label={
                        <>
                          Number of Seats Per Row{" "}
                          <span className="text-red-600">*</span>
                        </>
                      }
                      value={seatPosition.backPosition.numberOfSeatsPerRow}
                      labelStyle="text-sm"
                      onChange={handleBusTypeChange}
                      onBlur={handleBusTypeBlur}
                      error={busTypeHasError && ""}
                    />
                    <Input
                      id="numberOfRows"
                      name="numberOfRows"
                      type="number"
                      placeholder="Ex: 1"
                      inputStyle={`w-full lg:w-[120px] h-[40px]`}
                      label={
                        <>
                          Number of Rows <span className="text-red-600">*</span>
                        </>
                      }
                      value={seatPosition.backPosition.numberOfRows}
                      onChange={handleBusTypeChange}
                      onBlur={handleBusTypeBlur}
                      error={busTypeHasError && ""}
                      labelStyle="text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            disabled={hasError || hasEmptyFields}
            className={` bg-red-500 text-white w-32 h-10 flex items-center justify-center rounded-md ${
              hasError || hasEmptyFields
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            type="submit"
          >
            {loading ? <GoSync className="animate-spin" /> : "Add Bus"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusAdd;
