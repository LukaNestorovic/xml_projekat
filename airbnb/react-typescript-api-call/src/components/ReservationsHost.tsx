import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SuiteService from "../services/SuiteService";
import ReservationService from "../services/ReservationService";
import {Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import * as React from "react";
import SuiteGuest from "./SuiteGuest";
import ReservationHost from "./ReservationHost";

export default function ReservationsHost(){
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState<any>();
    const navigate = useNavigate()

    useEffect(() => {
        const userId = localStorage.getItem("userId")
        console.log(userId)
        const roles = localStorage.getItem("roles");
        if(roles == null){
            console.error("Access denied")
            navigate("/")
        }
        else if(!roles.includes("ROLE_HOST")){
            console.error("Access denied")
            navigate("/")
        }
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await ReservationService.getByHost(userId);
                setReservations(response.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return(
        <TableContainer component={Paper}>
            <Stack direction="column">
                <h1 style={{textAlign: 'center', alignSelf: 'center'}}>Reservations</h1>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Id</TableCell>
                            <TableCell align={"center"}>Suite</TableCell>
                            <TableCell align={"center"}>Start date</TableCell>
                            <TableCell align={"center"}>End date</TableCell>
                            <TableCell align={"center"}>Number of guests</TableCell>
                            <TableCell align={"center"}>User</TableCell>
                            <TableCell align={"center"}>Accept</TableCell>
                            <TableCell align={"center"}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    {!loading && (
                        <TableBody>
                            {reservations.map((reservation:any) => (
                                <ReservationHost
                                    reservation={reservation}
                                    key={reservation.id}/>
                            ))}
                        </TableBody>
                    )}
                </Table>
                <Button variant="contained" style={{width:200, alignSelf:'center'}} onClick={() => navigate("/homehost")}>Home</Button>
            </Stack>
        </TableContainer>
    );
}