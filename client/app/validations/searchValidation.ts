import * as yup from "yup";

export const validationSchema = yup.object({
  actionName: yup.string().required("Akcija je obavezna"),
  currency: yup.string().required("Valuta je obavezna"),
  amount: yup.number().positive().integer().required("Iznos je obavezan"),
});
