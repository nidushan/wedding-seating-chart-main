Below are explanations of each field:

* `lastName`: The shared last name of the couple.
* `bride`: The first name of the bride.
* `groom`: The first name of the groom.
* `date`: The date of the wedding.
* `time`: The time of the wedding.
* `location`: The location of the wedding.
* `seatingChart`: A dictionary of table identifiers and their corresponding people.
    * `[key]`: The name of the table, such as "Sweetheart", "Head", or a number.

The value of `seatingChart[key]` must be an array. Each element in the array represents a single person. However, a single person can be expressed in one of two ways:
* `string`: The single name of the guest. Most guests can be represented this way.
* `string[]`: An array of multiple names the guest may go by. If a guest has multiple names that you want to be accessible in the application, they should all be listed here. Note that the first name in the array will always be displayed on the escort card.
    * Furthermore, tags or roles may be added to this array. Tags are designated with an asterisk at the beginning (for instance, `"*Best Man"` or `"*Mother"`). Tags are explained [below](#searching).

## Searching
Searching is the process by which guests find their escort card. Searching is case-insensitive and designed to be as simple as possible.

Search can be separated into two categories: names and tags.

### Names
Names receive extra flexibility when searching to ease the guest experience.

Consider the couple "Roland Price" and "Rebecca Price". The appearance of their escort cards in the search results depends on the following:

* Search is "Roland": only "Roland Price" appears, along with other guests with the first name "Roland".
* Search is "Roland Price": only "Roland Price" appears.
* Search is "Rebecca": only "Rebecca Price" appears, along with other guests with the first name "Rebecca".
* Search is "Rebecca Price": only "Rebecca Price" appears.
* Search is "Price": both "Roland Price" and "Rebecca Price" appear, along with other guests with the last name "Price".
* Other: neither "Roland Price" nor "Rebecca Price" appear.

The above eaxmple demonstrates that names are split to allow for shared last names to be searched together. Thus, guests can search for themselves by full name, first name, or last name.

### Tags
Tags are an extra functionality that allows for guests to be searched by some tag or role they play in the wedding. Some common tags include "Family", "Bridal Party", "Ring Bearer", "Father", "College", or anything!

The goal of tags is to provide a fun way to see groupings of people. After a guest has made a search, an "I'm Feeling Lucky" button will appear that will randomly search for one of the tags listed in the data file. A guest may luckily find themselves in one of these tags!

A tag is designated by starting it with an asterisk in the data file in a name array. Unlike names, tags must be searched for exactly. For instance, the tag "Best Man" will not appear when someone searches "Best" or "Man".

### Example
This section gives an example of how guests can search for their name. Consider the following seating chart:

```json
{
    "seatingChart": {
        "Sweetheart": [
            [
                "Jane Smith",
                "Jane Maiden",
                "*Bride"
            ],
            [
                "John Smith",
                "*Groom"
            ]
        ],
        "1": [
            [
                "Bob Johnson",
                "*Best Man"
            ],
            [
                "Olivia Brown",
                "*Maid of Honor"
            ],
            "Jeremy Ty",
            "Roland Price",
            "Rebecca Price",
            "John Mann"
        ]
    }
}
```

Below gives all of valid searches for each person:

* Jane Smith: "Jane", "Smith", "Jane Smith", "Maiden", "Jane Maiden", "Bride".
* John Smith: "John", "Smith", "John Smith", "Groom".
* Bob Johnson: "Bob", "Johnson", "Bob Johnson", "Best Man".
* Olivia Brown: "Olivia", "Brown", "Olivia Brown", "Maid of Honor".
* Jeremy Ty: "Jeremy", "Ty", "Jeremy Ty".
* Roland Price: "Roland", "Price", "Roland Price".
* Rebecca Price: "Rebecca", "Price", "Rebecca Price".
* John Mann: "John", "Mann", "John Mann".
