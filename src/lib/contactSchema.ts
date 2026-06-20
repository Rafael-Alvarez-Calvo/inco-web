import * as yup from 'yup'

export const contactSchema = yup.object({
  nombre:  yup.string().required('El nombre es obligatorio').min(2, 'Mínimo 2 caracteres'),
  empresa: yup.string(),
  email:   yup.string().required('El email es obligatorio').email('Introduce un email válido'),
  tel:     yup.string().matches(/^(\+?[\d\s\-()]{6,20})?$/, { message: 'Teléfono no válido', excludeEmptyString: true }),
  tipo:    yup.string(),
  msg:     yup.string(),
})

export type ContactFormData = yup.InferType<typeof contactSchema>
