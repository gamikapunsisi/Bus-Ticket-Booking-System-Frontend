import React, { useState } from "react";
import Input from "../../components/Form/Input";
import { useInput } from "../../hooks/use-input";
import { isFloatNumber, isNotEmpty } from "../../validation/Validations";
import { GoSync } from "react-icons/go";

const RoadRouteAdd = () => {
  const [loading, setLoading] = useState(false);

  const {
    value: routeName,
    handleInputChange: handleRouteNameChange,
    handleInputBlur: handleRouteNameBlur,
    hasError: routeNameHasError,
    setValue: setRouteName,
    reset: resetRouteName,
  } = useInput("", isNotEmpty);

  const {
    value: routeId,
    handleInputChange: handleRouteIdChange,
    handleInputBlur: handleRouteIdBlur,
    hasError: routeIdHasError,
    setValue: setRouteId,
    reset: resetRouteId,
  } = useInput("", isNotEmpty);

  const {
    value: distance,
    handleInputChange: handleDistanceChange,
    handleInputBlur: handleDistanceBlur,
    hasError: distanceHasError,
    setValue: setDistance,
    reset: resetDistance,
  } = useInput("", isFloatNumber);

  const {
    value: estimatedTime,
    handleInputChange: handleEstimatedTimeChange,
    handleInputBlur: handleEstimatedTimeBlur,
    hasError: estimatedTimeHasError,
    setValue: setEstimatedTime,
    reset: resetEstimatedTime,
  } = useInput("", isNotEmpty);

  const hasError =
    routeNameHasError ||
    routeIdHasError ||
    distanceHasError ||
    estimatedTimeHasError;

  const hasEmptyFields = !routeName || !routeId || !distance || !estimatedTime;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hasError || hasEmptyFields) {
      return;
    }

    setLoading(true);
  };

  return (
    <div className="font-sans ">
      <h1 className="mb-4 text-xl font-bold ">Register New Road Route</h1>
      <div className="ml-5 ">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-6 ">
            <div>
              <Input
                id="routeId"
                name="routeId"
                type="text"
                placeholder="Ex: 22-2 (kandy - Ampara route code)"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Route ID <span className="text-blue-600">*</span>
                  </>
                }
                value={routeId}
                onChange={handleRouteIdChange}
                onBlur={handleRouteIdBlur}
                error={routeIdHasError && "Please enter valid route id"}
              />
            </div>
            <div className="w-[512px]">
              <Input
                id="routeName"
                type="text"
                placeholder="Ex: Kandy - Colombo"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                value={routeName}
                onChange={handleRouteNameChange}
                onBlur={handleRouteNameBlur}
                label={
                  <>
                    Route Name <span className="text-blue-600">*</span>
                  </>
                }
                error={routeNameHasError && "Please enter valid route name"}
              />
            </div>
            <div>
              <Input
                id="distance"
                name="distance"
                type="number"
                placeholder="Ex: Enter distance as killometers 54.3 / 43"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Distance <span className="text-blue-600">*</span>
                  </>
                }
                value={distance}
                onChange={handleDistanceChange}
                onBlur={handleDistanceBlur}
                error={distanceHasError && "Please enter valid distance"}
              />
            </div>
            <div>
              <Input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                placeholder="Ex: 5h 30m"
                inputStyle={`w-full lg:w-[350px] h-[40px]`}
                label={
                  <>
                    Estimated Time <span className="text-blue-600">*</span>
                  </>
                }
                value={estimatedTime}
                onChange={handleEstimatedTimeChange}
                onBlur={handleEstimatedTimeBlur}
                error={
                  estimatedTimeHasError && "Please enter valid estimated time"
                }
              />
            </div>
          </div>

          <button
            disabled={hasError || hasEmptyFields}
            className={` bg-blue-500 text-white w-32 h-10 flex items-center justify-center rounded-md ${
              hasError || hasEmptyFields
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            type="submit"
          >
            {loading ? <GoSync className="animate-spin" /> : "Add Route"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoadRouteAdd;
