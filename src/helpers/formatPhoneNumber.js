const formatPhoneNumber = (input) => {
  let phoneNumber = input;

  // Check if the input starts with '+'
  if (input.startsWith('+')) {
    phoneNumber = input.substring(1);
  }

  const phoneHead = phoneNumber.substring(0, 1);
  const areaCode = phoneNumber.substring(1, 4);
  const middle = phoneNumber.substring(4, 7);
  const last = phoneNumber.substring(7, 11);

  return `+${phoneHead} (${areaCode}) ${middle} ${last}`;
}

export default formatPhoneNumber