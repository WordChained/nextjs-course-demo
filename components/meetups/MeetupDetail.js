import classes from '../../components/meetups/MeetupDetail.module.css'

const MeetupDetail = (props) => {
    return (
        <section className={classes['meetup-detail']}>
            <img src={props.image} alt={props.title} />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
            <p>{props.description}</p>
        </section>
    )
}

export default MeetupDetail;