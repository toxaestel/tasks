(function () {
    'use strict';

    const ERROR_MSG = {
        DEFINE_ARRAY: 'Sorry, array is required.',
        DEFINE_OBJECT: 'Please define source data object'
    };

    const DATA = {
        array: [-2, 0, 1, 2, 3, 4, 5, 8, 9, 11, 13, 15, 18, 22, 25, 28, 29, 30],
        user: {
            "User": 1,
            "Data": {
                "FirstName": "Anonimoys",
                "LastName": "AnonimoysLastName",
                "MiddleName": "AnonimoysMiddleName",
                "Role": [
                    1, 2, 4, {
                        "isOwner": true
                    },
                    {
                        "hidden": null
                    },
                    {
                        "visibleStat": 'null'
                    }
                ]
            },
            "Profile": [
                {
                    "Check": true,
                    "CheckRole": [
                        1, 2, 34
                    ]
                },
                {
                    "Settings": {
                        "Rider": [
                            1, 2, 3, 4
                        ],
                        "Inside": {
                            "In": true,
                            "Out": null
                        }
                    }
                }
            ]
        }
    };

    let $object = {};

    $object.parseNum = parseNum;
    $object.sortArray = sortArray;
    $object.plainObject = plainObject;


    console.log('-------------------TASK-1-----------------------');


    function parseNum(val) {
        if (val === undefined) {
            return null;
        }
        let parsedVal = parseInt(val);
        if (isNaN(parsedVal)) {
            return val;
        }
        else {
            return parsedVal;
        }
    }

    function sortArray(arr) {
        if (!arr || !Array.isArray(arr)) {
            return ERROR_MSG.DEFINE_ARRAY;
        }

        let sortedArr = [],
            sortedSq = '';

        arr.forEach(function (el, i) {
            el = $object.parseNum(el);
            let nextNum = $object.parseNum(arr[i + 1]),
                prevNum = $object.parseNum(arr[i - 1]);

            if (el === nextNum - 1) {
                if (el !== prevNum + 1) {
                    sortedSq = el + '-';
                }
            }
            else {
                sortedArr.push(sortedSq + el);
                sortedSq = '';
            }
        });

        return sortedArr.join(', ');
    }

    console.log('Source array: ' + DATA.array);
    console.log('Sorted array: ' + $object.sortArray(DATA.array));


    console.log('-------------------TASK-2-----------------------');

    function plainObject(data) {
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            console.log(ERROR_MSG.DEFINE_OBJECT);
            return;
        }

        let result = {};
        function _checkObject(obj, keyChain) {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    keyChain = keyChain || '';

                    let currentProp = !keyChain.length ? prop : _getCurrentProp(keyChain, prop),
                        currentVal = obj[prop];

                    if (typeof currentVal === 'object' && currentVal !== null) {
                        if (Array.isArray(currentVal)) {
                            _checkObjectArray(currentVal, currentProp);
                        }
                        else {
                            _checkObject(currentVal, currentProp);
                        }
                    }
                    else {
                        result[currentProp] = currentVal;
                    }
                }
            }
            return result;
        }

        function _getCurrentProp(keyChain, prop) {
            return keyChain + prop.replace(/\b\w/g, l => l.toUpperCase())
        }

        function _checkObjectArray(arr, resultKey) {
            let isPrimitive = arr.every(
                elem => (typeof elem !== 'object' || elem === null)
            );
            if (isPrimitive) {
                result[resultKey] = arr;
            }
            else {
                arr.forEach(function (el, ignore) {
                    if (typeof el === 'object') {
                        _checkObject(el, resultKey);
                    }
                    else {
                        result[resultKey + el] = el;
                    }
                });
            }
        }

        return _checkObject(data);
    }

    console.log('Source object: ' + JSON.stringify(DATA.user));
    console.log('Plain object: ' + JSON.stringify($object.plainObject(DATA.user)));

    return $object;
}());
