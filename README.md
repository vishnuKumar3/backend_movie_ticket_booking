<h1>MoTick(movie ticket management)(Node and mongodb)</p>
<h2>Installation process</h2>
<p>Install dependencies using <b>npm install</b></p> 
<p>Now run <b>npm start</b>, server will start</p>    
<h2>Implemented functionalities</h2>
<ul>
    <li>For security purpose, router level middleware added and is validating user for seat booking and booking history</li>
    <li>Formatted the data that is fetched from DB in a way that it will be compatible for our application using the data structures to improve the performance of database by reducing load</li>
    <li>Api's related to user - login and signup implemented.</li>
    <li>Api's related to movies - create, fetch,filter implemented.</li>
    <li>Api's related to Theatres - create, fetch implemented.</li>
    <li>Api's related to Shows - create, fetch and segregation logic implemented.</li>(Here we are managing seat structure and bookings for each show)
    <li>Segregated the seat bookings between theatres along with the timings</li>
    <li>Models added for user,movies,theatres,shows,userBookings to achieve ORM</li>
    <li>Mongodb used as database</li>
</ul>    
