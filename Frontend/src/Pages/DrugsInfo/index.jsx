import { useEffect, useState } from "react";
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
    }, [page]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                Drug Data
            </Typography>
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
                        {drugsInfo?.data?.map((drug, index) => (
                            <TableRow key={drug.code}>
                                <TableCell>{index + 1}</TableCell>
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
                    onPageChange={(event, newPage) => setPage(newPage)}
                    rowsPerPage={LIMIT}
                    rowsPerPageOptions={[]}       // to hide the rows per page dropdown
                    labelRowsPerPage=""           // // to hide the rows per page label
                />
            </TableContainer>
        </Box>
    );
}

export default DrugInfo;