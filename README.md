
# Check Movie booking information

```http
GET /bms/<Location>/<movieTitle>/<movieCode>
```

### Sample URL
```http
 https://bms-booking.vercel.app/bms/chittoor/rrr/ET00094579
```

### Sample response
```javascript
{
  "bookingAvailable": boolean
}
```





# Check Movie booking information for a selected theater 

```http
GET /<theaterCode>/<movieTitle>/<location>/<locationCode>/<movieCode>
```

### Sample URL
```http
 https://bms-booking.vercel.app/RGHA/rrr/chittoor/chtt/ET00094579
```

### Sample response
```javascript
{
  "bookingAvailable": boolean
}
```

---

Open to contributions
