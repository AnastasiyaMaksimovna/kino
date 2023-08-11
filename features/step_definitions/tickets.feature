Feature: Booking 1 ticket
    Scenario: Booking one ticket for tomorrow
        Given user went to the website, chose tomorrow's date, movie and time
        When user selects place
        When user clicks the book button
        Then user see text 'Получить код бронирования'

Feature: Booking 2 tickets
    Scenario: Booking two ticket for tomorrow
        Given user went to the website, chose tomorrow's date, movie and time
        When user selects one place
        When user selects two place
        When user clicks the book button
        When user clicks the get booking code button
        Then user sees the QR code

Feature: Booking of occupied space
    Scenario: Booking purchase of occupied space for tomorrow
        Given user went to the website, chose tomorrow's date, movie and time
        When user selects two place
        When user clicks the book button
        Then user sees that the ticket cannot be booked