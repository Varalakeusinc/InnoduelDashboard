import * as React from "react";
import { useAppDispatch } from "@/store/hooks";
import { setCompany } from "@/store/userSlice";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Company, companyService } from "@/src/services/companies";
import { useTranslation } from "react-i18next";

const CompanySelector = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [companies, setCompanies] = React.useState<ReadonlyArray<Company>>(
		[]
	);

	React.useEffect(() => {
		// Fetch all companies
		companyService.getAllCompanies().then(setCompanies);
	}, []);

	const handleCompanySelect = React.useCallback(
		(companyId: number, companyName: string) => {
			dispatch(setCompany({ companyId, companyName }));
		},
		[]
	);

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button
					data-test-id="company-selector-button"
					className="IconButton"
					aria-label="Customise options"
					style={{ width: "100%" }}
				>
					{t("select_company")}
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					sideOffset={5}
					style={{
						position: "relative",
						backgroundColor: "whitesmoke",
						color: "black",
						borderRadius: "10px",
						maxHeight: "400px",
						overflowY: "auto",
						padding: "10px",
						zIndex: 9999, // Ensure the dropdown appears on top of other elements
					}}
				>
					{companies.map((company: Company) => (
						<DropdownMenu.Item
							key={company.id}
							className="DropdownMenuItem"
							onClick={() =>
								handleCompanySelect(
									company.id,
									company.name ?? ""
								)
							}
						>
							{company.name}
						</DropdownMenu.Item>
					))}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};

export default CompanySelector;
