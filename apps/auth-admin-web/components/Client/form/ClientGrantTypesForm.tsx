import React, { useEffect, useState } from 'react'
import HelpBox from '../../common/HelpBox'
import { GrantType } from '../../../entities/models/grant-type.model'
import { ClientGrantTypeDTO } from '../../../entities/dtos/client-grant-type.dto'
import NoActiveConnections from '../../common/NoActiveConnections'
import { ClientService } from '../../../services/ClientService'
import { GrantService } from '../../../services/GrantService'

interface Props {
  clientId: string
  grantTypes?: string[] // What is currently valid for updating existing Clients
  handleNext?: () => void
  handleBack?: () => void
  handleChanges?: () => void
}

const ClientGrantTypesForm: React.FC<Props> = (props: Props) => {
  const [grantTypes, setGrantTypes] = useState<GrantType[]>([])

  useEffect(() => {
    getGrantTypes()
  }, [])

  const getGrantTypes = async () => {
    const response = await GrantService.findAll()
    if (response) {
      setGrantTypes(response)
    }
  }

  const add = async (grantType: string) => {
    const createObj: ClientGrantTypeDTO = {
      grantType: grantType,
      clientId: props.clientId,
    }

    const response = await ClientService.addGrantType(createObj)
    if (response) {
      if (props.handleChanges) {
        props.handleChanges()
      }
    }
  }

  const remove = async (grantType: string) => {
    const response = await ClientService.removeGrantType(
      props.clientId,
      grantType,
    )
    if (response) {
      if (props.handleChanges) {
        props.handleChanges()
      }
    }
  }

  const setValue = (grantType: string, value: boolean) => {
    if (value) {
      add(grantType)
    } else {
      remove(grantType)
    }
  }

  return (
    <div className="client-grant-types">
      <div className="client-grant-types__wrapper">
        <div className="client-grant-types__container">
          <h1>Select the appropriate grant type</h1>

          <div className="client-grant-types__container__form">
            <div className="client-grant-types__help">
              Select the types of authentication that are allowed for this
              Client
            </div>
            <div className="client-grant-types__container__fields">
              {grantTypes?.map((grantType: GrantType) => {
                return (
                  <div
                    className="client-grant-types__container__checkbox__field"
                    key={grantType.name}
                  >
                    <label
                      className="client-grant-types__label"
                      title={grantType.description}
                    >
                      {grantType.name}
                    </label>
                    <input
                      type="checkbox"
                      name={grantType.name}
                      className="client__checkbox"
                      defaultChecked={props.grantTypes?.includes(
                        grantType.name,
                      )}
                      onChange={(e) =>
                        setValue(grantType.name, e.target.checked)
                      }
                      title={`Set grant type ${grantType.name} as active og inactive`}
                    />
                    <HelpBox helpText={grantType.description} />
                  </div>
                )
              })}
            </div>

            <NoActiveConnections
              title="No grant types are defined"
              show={!props.grantTypes || props.grantTypes.length === 0}
              helpText="Check the appropriate grant type(s) for the client"
            ></NoActiveConnections>

            <div className="client-grant-types__buttons__container">
              <div className="client-grant-types__button__container">
                <button
                  type="button"
                  className="client-grant-types__button__cancel"
                  onClick={props.handleBack}
                >
                  Back
                </button>
              </div>
              <div className="client-grant-types__button__container">
                <button
                  type="button"
                  className="client-grant-types__button__save"
                  value="Next"
                  onClick={props.handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ClientGrantTypesForm
