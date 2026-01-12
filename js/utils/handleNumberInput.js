export const handleNumberInput = (input) => {
  const valueStr = input.value.trim();

  if (valueStr === "") return;

  const cleanValue = valueStr.replace(/[^\d.]/g, "");

  const parts = cleanValue.split(".");
  const filteredValue =
    parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleanValue;

  if (filteredValue === "" || filteredValue === ".") {
    input.value = "";
    return;
  }

  const value = parseFloat(filteredValue);

  if (isNaN(value)) {
    input.value = "";
    return;
  }

  const min = parseFloat(input.getAttribute("min"));
  const max = parseFloat(input.getAttribute("max"));

  if (!isNaN(min) && value < min) {
    input.value = min;
  } else if (!isNaN(max) && value > max) {
    input.value = max;
  } else {
    input.value = value;
  }
};
