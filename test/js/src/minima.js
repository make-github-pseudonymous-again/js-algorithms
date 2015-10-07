
var sort = require( "aureooms-js-sort" ) ;
var array = require( "aureooms-js-array" ) ;
var random = require( "aureooms-js-random" ) ;
var compare = require( "aureooms-js-compare" ) ;

test( "minima 1" , function ( ) {

	var a = [ 1 , 2 , 3 , 4 , 6 , 12 ] ;

	var divides = function ( a , b ) { return b % a === 0 ; } ;

	random.shuffle( a , 0 , a.length ) ;

	var min = algorithms.clarkson( divides , a , 0 , a.length ) ;

	deepEqual( min , 1 , "minima set has cardinality 1" ) ;

	deepEqual( a[0] , 1 , "minimum is 1" ) ;

} ) ;

test( "minima 2,3" , function ( ) {

	var a = [ 1 , 2 , 3 , 4 , 6 , 12 ] ;

	var i = 1 ;

	var j = a.length ;

	var divides = function ( a , b ) { return b % a === 0 ; } ;

	random.shuffle( a , i , j ) ;

	var min = algorithms.clarkson( divides , a , i , j ) ;

	deepEqual( min - i , 2 , "minima set has cardinality 2" ) ;

	sort.insertionsort( compare.increasing , a , i , min ) ;

	deepEqual( a[i+0] , 2 , "1st minimum is 2" ) ;
	deepEqual( a[i+1] , 3 , "2nd minimum is 3" ) ;

} ) ;


test( "minima totally unordered set" , function ( ) {

	n = 1000 ;

	var a = array.alloc( n ) ;

	array.iota( a , 0 , n , 0 ) ;

	var prec = function ( a , b ) { return false ; } ;

	random.shuffle( a , 0 , n ) ;

	var min = algorithms.clarkson( prec , a , 0 , n ) ;

	deepEqual( min , n , "minima set has cardinality n" ) ;

} ) ;
