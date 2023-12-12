import { ConsultDetail } from "./consultDetail"
import { Medic } from "./medic"
import { Patient } from "./patient"

export class Consult{
    idConsult: number
    patient: Patient
    medic: Medic
    details: ConsultDetail[]
    consultDate: string
}