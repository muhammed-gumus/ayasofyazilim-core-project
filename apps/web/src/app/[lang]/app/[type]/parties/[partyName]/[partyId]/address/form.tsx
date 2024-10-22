"use client";

import type {
  UniRefund_CRMService_Individuals_IndividualDto,
  UniRefund_CRMService_Organizations_OrganizationDto,
} from "@ayasofyazilim/saas/CRMService";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { SectionLayoutContent } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { addressSchemaByData } from "@repo/ui/utils/table/form-schemas";
import { getEnumId, getEnumName } from "@repo/ui/utils/table/table-utils";
import { useRouter } from "next/navigation";
import type { CRMServiceServiceResource } from "src/language-data/CRMService";
import type { PartyNameType } from "../../../types";
import { handleUpdateSubmit } from "../utils";
import type { PutAddress } from "../types";

function Address({
  languageData,
  partyName,
  partyId,
  organizationData,
  citiesEnum,
}: {
  languageData: CRMServiceServiceResource;
  partyName: Exclude<PartyNameType, "individuals">;
  partyId: string;
  organizationData:
    | UniRefund_CRMService_Organizations_OrganizationDto
    | UniRefund_CRMService_Individuals_IndividualDto
    | undefined;
  citiesEnum: { name: string; id: string }[];
}) {
  const router = useRouter();

  const addressValues = {
    ...organizationData?.contactInformations?.[0]?.addresses?.[0],
    cityId: getEnumName(
      citiesEnum,
      organizationData?.contactInformations?.[0]?.addresses?.[0]?.cityId || "",
    ),
  };

  const addressSchema = addressSchemaByData([], citiesEnum, [
    "countryId",
    "regionId",
  ]).schema;
  return (
    <SectionLayoutContent sectionId="address">
      <AutoForm
        formClassName="pb-40 "
        formSchema={addressSchema}
        onSubmit={(values) => {
          void handleUpdateSubmit(
            partyName,
            {
              action: "address",
              data: {
                requestBody: {
                  ...values,
                  cityId: getEnumId(citiesEnum, values.cityId as string),
                  countryId:
                    organizationData?.contactInformations?.[0]?.addresses?.[0]
                      ?.countryId || "",
                  regionId:
                    organizationData?.contactInformations?.[0]?.addresses?.[0]
                      ?.regionId || "",
                },
                id: partyId,
                addressId: addressValues.id || "",
              } as PutAddress["data"],
            },
            router,
          );
        }}
        values={addressValues}
      >
        <AutoFormSubmit className="float-right">
          {languageData.Save}
        </AutoFormSubmit>
      </AutoForm>
    </SectionLayoutContent>
  );
}

export default Address;
