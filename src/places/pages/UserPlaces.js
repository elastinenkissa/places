import styled from "styled-components";
import PlaceList from "../components/PlaceList";
import uuid from "react-uuid";

const UserPlaces = (props) => {

    const PLACES = [
        {
            id: uuid(),
            title: 'Bazinga Memorial',
            description: 'Truly one of the funniest places in existence.',
            imgUrl: 'https://img-new.cgtrader.com/items/3209261/43d23bcdb1/sheldon-cooper-the-big-bang-theory-3d-model.jpg',
            address: 'Chungus Blvd 420',
            location: {
                lat: 45.3141624,
                lng: 7.4543729
            },
            poster: 'u1'
        },
        {
            id: uuid(),
            title: 'Fourth Knight',
            description: '#1 Victory Royale.',
            imgUrl: 'https://th.bing.com/th/id/R.a2a3c670c26f048d195c5121cbc5137b?rik=LszVjiHUGQ%2bnHQ&riu=http%3a%2f%2fwww.pwrdown.com%2fwp-content%2fuploads%2f2018%2f01%2fEvening_DurrrBurger.jpg&ehk=2r9K%2bCpHKqZTwb0CSOlrfV0w1TB5%2bERzBeesOZstsTU%3d&risl=&pid=ImgRaw&r=0',
            address: 'Tomato Town 32',
            location: {
                lat: -11.8782385,
                lng: -93.8867985
            },
            poster: 'u2'
        }
    ]
    return (
        <>
            <PlaceList items={PLACES} />
        </>
    )
};

export default UserPlaces;
