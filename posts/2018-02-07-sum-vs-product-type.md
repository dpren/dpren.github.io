###### Algebraic data types:
## Sum type vs. Product type

##### Refers to how you would calculate a type's number of possible values.

* ##### "sum" is logical alternation
    A **_or_** B  
    `a | b`

* ##### "product" is a combination of alternation
    (A _or_ B) **_and_** (C _or_ D)  
    `a | b, c | d`


&nbsp;

--------

&nbsp;

## Sum type
###### eg. Either, Maybe

* `Bool` is a set of 2 values.
* `Char` is a set of 256 values.


    data MySumType = Foo Bool | Bar Char

                     2            + 256
                     True | False | 'a' | 'b' | 'c' | ...

`MySumType` is a set of 2 + 256 possible values.



## Product type
###### eg. tuple, record


    data MyProductType = Baz (Bool, Char)

                   *     256                        
                   2    (True,  'a') | (True,  'b') | (True,  'c') | ...
                        (False, 'a') | (False, 'b') | (False, 'c') | ...

`MyProductType` is a set of 2   * 256 possible values.

&nbsp;

    data MyProductType2 = Baz (Char, Char)

                    *    256  ––>
                   256  ('a', 'a') | ('a', 'b') | ('a', 'c') | ...
                        ('b', 'a') | ('b', 'b') | ('b', 'c') | ...
                    |   ('c', 'a') | ('c', 'b') | ('c', 'c') | ...
                    V   ('d', 'a') | ('d', 'b') | ('d', 'c') | ...
                        ('e', 'a') | ('e', 'b') | ('e', 'c') | ...
                        ('f', 'a') | ('f', 'b') | ('f', 'c') | ...
                        ('g', 'a') | ('g', 'b') | ('g', 'c') | ...
                        ...

`MyProductType2` is a set of 256 * 256 possible values.

&nbsp;

    data Person = Person {
                     isCool  :: Bool
                     favChar :: Char,
                  }

                   *    256 ––>                  
                   2    Person {isCool = True,  favChar = 'a'} | ...
                        Person {isCool = False, favChar = 'a'} | ...

Hopefully you get the idea.