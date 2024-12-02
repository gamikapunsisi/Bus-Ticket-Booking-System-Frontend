import React, { useState } from "react";
import Input from "../../components/Form/Input";
import { useInput } from "../../hooks/use-input";
import { isFloatNumber, isNotEmpty } from "../../validation/Validations";
import { GoSync } from "react-icons/go";


const RoadRouteAdd = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Input Hooks
  const routeNameInput = useInput("", isNotEmpty);
  const routeIdInput = useInput("", isNotEmpty);
  const distanceInput = useInput("", isFloatNumber);
  const estimatedTimeInput = useInput("", isNotEmpty);

  const hasError =
    routeNameInput.hasError ||
    routeIdInput.hasError ||
    distanceInput.hasError ||
    estimatedTimeInput.hasError;

  const hasEmptyFields =
    !routeNameInput.value ||
    !routeIdInput.value ||
    !distanceInput.value ||
    !estimatedTimeInput.value;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasError || hasEmptyFields) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("Route added successfully!");

      // Reset all inputs after submission
      routeNameInput.reset();
      routeIdInput.reset();
      distanceInput.reset();
      estimatedTimeInput.reset();
    }, 1500);
  };

  return (
    <div className="font-sans">
      <h1 className="mb-4 text-xl font-bold">Register New Account</h1>
      <div className="ml-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Route ID Input */}
            <Input
              id="accountId"
              name="accountId"
              type="text"
              placeholder="Ex: A1 (ID - A-01)"
              inputStyle="w-full lg:w-[350px] h-[40px]"
              label={
                <>
                  Account ID <span className="text-blue-600">*</span>
                </>
              }
              value={accountIdInput.value}
              onChange={accountIdInput.handleInputChange}
              onBlur={accountIdInput.handleInputBlur}
              error={accountIdInput.hasError && "Please enter a valid Account ID"}
            />

            {/* Account Name Input */}
            <Input
              id="accountName"
              type="text"
              placeholder="Ex: Gamika Punsisi"
              inputStyle="w-full lg:w-[350px] h-[40px]"
              value={accountNameInput.value}
              onChange={accounytNameInput.handleInputChange}
              onBlur={accountNameInput.handleInputBlur}
              label={
                <>
                  Account Name <span className="text-blue-600">*</span>
                </>
              }
              error={accountNameInput.hasError && "Please enter a valid account name"}
            />

            {/* Distance Input */}
            <Input
              id="distance"
              name="distance"
              type="number"
              placeholder="Ex: Enter distance in kilometers (e.g., 54.3 / 43)"
              inputStyle="w-full lg:w-[350px] h-[40px]"
              label={
                <>
                  Distance <span className="text-blue-600">*</span>
                </>
              }
              value={distanceInput.value}
              onChange={distanceInput.handleInputChange}
              onBlur={distanceInput.handleInputBlur}
              error={distanceInput.hasError && "Please enter a valid distance"}
            />

            {/* Estimated Time Input */}
            <Input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              placeholder="Ex: 5h 30m"
              inputStyle="w-full lg:w-[350px] h-[40px]"
              label={
                <>
                  Estimated Time <span className="text-blue-600">*</span>
                </>
              }
              value={estimatedTimeInput.value}
              onChange={estimatedTimeInput.handleInputChange}
              onBlur={estimatedTimeInput.handleInputBlur}
              error={
                estimatedTimeInput.hasError &&
                "Please enter a valid estimated time"
              }
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={hasError || hasEmptyFields}
            className={`bg-blue-500 text-white w-32 h-10 flex items-center justify-center rounded-md ${
              hasError || hasEmptyFields
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            type="submit"
          >
            {loading ? <GoSync className="animate-spin" /> : "Add Route"}
          </button>
        </form>

        {/* Success Message */}
        {successMessage && (
          <p className="mt-4 text-green-600">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default RoadRouteAdd;
