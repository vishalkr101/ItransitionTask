import { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    TablePagination,
} from '@mui/material';

const DrugInfo = () => {
    const [drugsInfo, setDrugsInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const LIMIT = 20; // Number of items per page
    const { totalDrugsCount } = drugsInfo;

    const [selectedCompany, setSelectedCompany] = useState("all-companies");

    // Extract unique companies for dropdown
    const companyOptions = useMemo(() => {
        if (!drugsInfo?.data) return [];
        const companies = drugsInfo.data.map(drug => drug.company);
        return Array.from(new Set(companies));
    }, [drugsInfo]);

    // Filter drugs by selected company
    const filteredDrugs = useMemo(() => {
        if (!drugsInfo?.data) return [];
        if (selectedCompany === "all-companies") return drugsInfo.data;
        return drugsInfo.data.filter(drug => drug.company === selectedCompany);
    }, [drugsInfo, selectedCompany]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        setSelectedCompany("all-companies");
    };

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/drugs', {
                    params: {
                        page: page + 1,
                        limit: LIMIT,
                    },
                });

                if (!response?.data) {
                    throw new Error('Invalid response from server');
                }
                const drugsDataArray = response?.data?.data;
                if (!Array.isArray(drugsDataArray) || drugsDataArray.length === 0) {
                    setError('No drugs found');
                    setDrugs([]);
                    return;
                }
                setDrugsInfo(response.data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDrugs();
    }, [page]); // Add selectedCompany to the dependency array

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                Drug Data
            </Typography>
            <Box mb={2}>
                <label htmlFor="company-filter"><strong>Filter by Company:</strong> </label>
                <select
                    id="company-filter"
                    value={selectedCompany}
                    onChange={e => setSelectedCompany(e.target.value)}
                >
                    <option value="all-companies">All Companies</option>
                    {companyOptions.map(company => (
                        <option key={company} value={company}>{company}</option>
                    ))}
                </select>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="drug info table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Id</strong></TableCell>
                            <TableCell><strong>Code</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Company</strong></TableCell>
                            <TableCell><strong>Launch Date</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDrugs.map((drug, index) => (
                            <TableRow key={drug.code}>
                                <TableCell>{(page * LIMIT) + index + 1}</TableCell>
                                <TableCell>{drug.code}</TableCell>
                                <TableCell>{`${drug.genericName} (${drug.brandName})`}</TableCell>
                                <TableCell>{drug.company}</TableCell>
                                <TableCell>
                                    {new Date(drug.launchDate).toLocaleDateString('en-GB')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={totalDrugsCount}
                    page={page}
                    onPageChange={(event, newPage) => handlePageChange(event, newPage)}
                    rowsPerPage={LIMIT}
                    rowsPerPageOptions={[]}       // to hide the rows per page dropdown
                    labelRowsPerPage=""           // // to hide the rows per page label
                />
            </TableContainer>
        </Box>
    );
}

export default DrugInfo;