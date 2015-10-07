

var n;

var itertools = require( "aureooms-js-itertools" );
var functools = require( "aureooms-js-functools" );
var splitting = require( "aureooms-js-splitting" );
var partition = require( "aureooms-js-partition" ) ;
var selection = require( "aureooms-js-selection" ) ;
var operator = require( "aureooms-js-operator" );
var compare = require( "aureooms-js-compare" );
var random = require( "aureooms-js-random" );
var array = require( "aureooms-js-array" );

var one = function ( bdp, __f__, a, i, j, di, dj, expected ) {

	++n;

	random.shuffle( a, i, j );

	var out = itertools.list( bdp( __f__, a, i, j, di, dj, [] ) );

	var outputordering = compare.lexicographical( compare.lexicographical( compare.increasing ) );

	array.sort( outputordering, out );
	array.sort( outputordering, expected );

	deepEqual( out, expected, n );

};

var all = function ( name, algo ) {

	n = 0;

	test( name, function ( ) {

		var f, __f__;

		f = function ( i, a, b ) {
			return a[i] - b[i];
		};

		__f__ = functools.curry( f, 3 );

		one( algo, __f__, [], 0, 0, 1, 1, [] );

		one( algo, __f__, [ [0] ], 0, 1, 1, 1, [] );

		one( algo, __f__, [ [1] ], 0, 1, 1, 1, [] );

		one( algo, __f__, [ [0], [0], [0], [0] ], 0, 4, 1, 1, [] );

		one( algo, __f__, [ [1], [1], [1], [1] ], 0, 4, 1, 1, [] );

		one(
			algo,
			__f__,
			[ [0], [0], [1], [1] ],
			0, 4,
			1, 1,
			[
				[ [1], [0] ],
				[ [1], [0] ],
				[ [1], [0] ],
				[ [1], [0] ]
			]
		);

		one(
			algo,
			__f__,
			[ [0, 0.5], [0, 1], [1, 1], [1, 0.5] ],
			0, 4,
			1, 2,
			[
				[ [1, 1], [0, 1] ],
				[ [1, 1], [0, 0.5] ],
				[ [1, 0.5], [0, 0.5] ]
			]
		);

		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [1, 1, 1], [1, 0.5, 2] ],
			0, 4,
			1, 3,
			[
				[ [1, 1, 1], [0, 0.5, 1] ],
				[ [1, 0.5, 2], [0, 0.5, 1] ]
			]
		);

		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [1, 1, 1], [1, 0.5, 2], [1, 1, 1], [1, 0.5, 2] ],
			0, 6,
			1, 3,
			[
				[ [1, 1, 1], [0, 0.5, 1] ],
				[ [1, 0.5, 2], [0, 0.5, 1] ],
				[ [1, 1, 1], [0, 0.5, 1] ],
				[ [1, 0.5, 2], [0, 0.5, 1] ]
			]
		);


		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [1, 1, 1], [1, 0.5, 2], [1, 1, 3], [1, 1, 2] ],
			0, 6,
			1, 3,
			[
				[ [1, 1, 1], [0, 0.5, 1] ],
				[ [1, 0.5, 2], [0, 0.5, 1] ],
				[ [1, 1, 3], [0, 0.5, 1] ],
				[ [1, 1, 2], [0, 0.5, 1] ],
				[ [1, 1, 3], [0, 1, 2] ],
				[ [1, 1, 2], [0, 1, 2] ]
			]
		);

		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [1, 1, 1], [1, 0.5, 2], [1, 1, 3], [0, 105, 1], [0, 1, 20], [1, 1, 2] ],
			0, 8,
			1, 3,
			[
				[ [1, 1, 1], [0, 0.5, 1] ],
				[ [1, 0.5, 2], [0, 0.5, 1] ],
				[ [1, 1, 3], [0, 0.5, 1] ],
				[ [1, 1, 2], [0, 0.5, 1] ],
				[ [1, 1, 3], [0, 1, 2] ],
				[ [1, 1, 2], [0, 1, 2] ]
			]
		);

		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [0, 105, 1], [0, 1, 20], [1, 105, 20], [1, 105, 20], [1, 106, 20] ],
			0, 7,
			1, 3,
			[
				[ [1, 105, 20], [0, 0.5, 1] ],
				[ [1, 105, 20], [0, 1, 2] ],
				[ [1, 105, 20], [0, 105, 1] ],
				[ [1, 105, 20], [0, 1, 20] ],
				[ [1, 105, 20], [0, 0.5, 1] ],
				[ [1, 105, 20], [0, 1, 2] ],
				[ [1, 105, 20], [0, 105, 1] ],
				[ [1, 105, 20], [0, 1, 20] ],
				[ [1, 106, 20], [0, 0.5, 1] ],
				[ [1, 106, 20], [0, 1, 2] ],
				[ [1, 106, 20], [0, 105, 1] ],
				[ [1, 106, 20], [0, 1, 20] ]
			]
		);

		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [0, 105, 1], [0, 1, 20], [1, 105, 20], [1, 105, 20], [1, 106, 20], [0, 107, 1], [0, 107, 1] ],
			0, 9,
			1, 3,
			[
				[ [1, 105, 20], [0, 0.5, 1] ],
				[ [1, 105, 20], [0, 1, 2] ],
				[ [1, 105, 20], [0, 105, 1] ],
				[ [1, 105, 20], [0, 1, 20] ],
				[ [1, 105, 20], [0, 0.5, 1] ],
				[ [1, 105, 20], [0, 1, 2] ],
				[ [1, 105, 20], [0, 105, 1] ],
				[ [1, 105, 20], [0, 1, 20] ],
				[ [1, 106, 20], [0, 0.5, 1] ],
				[ [1, 106, 20], [0, 1, 2] ],
				[ [1, 106, 20], [0, 105, 1] ],
				[ [1, 106, 20], [0, 1, 20] ]
			]
		);


	});

};

[
	[
		"algo.__bdpdc__",
		algo.__bdpdc__(
			selection.single( partition.hoare ) , // select,
			functools.curry( function ( i, v, a ) { // __eq__,
				return + ( v === a[i] );
			}, 3 ),
			functools.curry( function ( i, v, a ) { // __ne__,
				return + ( v !== a[i] );
			}, 3 ),
			operator.itemgetter( 0 ),               // color,
			splitting.hoare,                        // split,
			array.swapranges                        // swap
		)
	],

	[
		"algo.__bdpdn2__",
		algo.__bdpdn2__(
			operator.itemgetter( 0 ),           // color,
			splitting.hoare                     // split
		)
	]

].forEach( functools.partial( functools.star, [all] ) );
