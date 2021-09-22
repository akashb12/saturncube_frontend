import React from "react";
import { useField, ErrorMessage } from "formik";
function TextField({ placeHolder, type, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="form-control  my-3"
        style={{ paddingTop: "1.1rem" }}
        {...field}
        {...props}
      />
      <ErrorMessage component="div" className="error" name={field.name} />
    </>
  );
}

export default TextField;
