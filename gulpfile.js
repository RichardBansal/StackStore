'use strict';

// All used modules.
var babel = require('gulp-babel');
var gulp = require('gulp');
var runSeq = require('run-sequence');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var karma = require('karma').server;
var q = require('q');

// Development tasks
// --------------------------------------------------------------

// Live reload business.
gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('reloadCSS', function () {
    return gulp.src('./public/style.css').pipe(livereload());
});

gulp.task('lintJS', function () {
    return gulp.src(['./browser/js/**/*.js', './server/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('buildJS', function () {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});

// TODO: Fix SeedDB issue with order, new updates made
gulp.task('testServerJS', function () {
    return gulp.src('./tests/server/**/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('testBrowserJS', function (done) {
    karma.start({
        configFile: __dirname + '/tests/browser/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('buildCSS', function () {
    return gulp.src('./browser/scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./public'));
});

gulp.task('seedDB', function () {

    var users = [
        {
            name: "Bob J.",
            addressBilling: "55 Hanover",
            addressShipping: "56 Wall St.",
            phoneNumber: "555-555-5555",
            accountType: "shopper",
            email: "bob@excite.com",
            password: "password"
        },
        {
            name: "Anne B.",
            addressBilling: "506 Broadway",
            addressShipping: "303 W 16th",
            phoneNumber: "123-456-7890",
            accountType: "admin",
            email: "anne@gmail.com",
            password: "woof"
        }
    ];    

    var products = [
        {
            name: "FSA T",
            description: "Tshirt with FSA lettering.",
            price: 2999,
            category: ["School shirts", "Tshirts"]
        },
        {
            name: "Nimit T",
            description: "Tshirt rocking an image of Nimit.",
            price: 3499,
            category: ["People shirts", "Tshirts"]
        }
    ];

    var orders = [
        {
            purchaseDate: "2015-04-20",
            status: "unfullfilled"
        },
        {
            purchaseDate: "2015-04-16",
            status: "fullfilled"
        }
    ];    

    var stocks = [
        {
            size: "M",
            quantity: 10
        },
        {
            size: "L",
            quantity: 6
        },
        {
            size: "S",
            quantity: 5
        },
        {
            size: "XS",
            quantity: 3
        }
    ];

    var reviews = [
        {
            stars: 5,
            text: "Best shirt on the friggin' planet!Best shirt on the friggin' planet!Best shirt on the friggin' planet!"
        },
        {
            stars: 3,
            text: "It's ok, but I've had better.It's ok, but I've had better.It's ok, but I've had better.It's ok, but I've had better."
        }
    ];

    var dbConnected = require('./server/db');

    var User = require('mongoose').model('User');
    var Product = require('mongoose').model('Product');
    var Order = require('mongoose').model('Order');
    var Stock = require('mongoose').model('Stock');
    var Review = require('mongoose').model('Review');
    

    return dbConnected.then(function () {
        return q.all([
            User.create(users),
            Product.create(products),
            Order.create(orders),
            Stock.create(stocks),
            Review.create(reviews)]);
    }).then(function() {
        return q.all([
            User.find().exec(), 
            Order.find().exec(),
            Product.find().exec(),
            Stock.find().exec(),
            Review.find().exec()
            ]);
    }).then(function (userAndOrderData) {
        console.log("*******",userAndOrderData);
        var users=userAndOrderData[0];
        var orders = userAndOrderData[1];
        var products=userAndOrderData[2];
        var stock=userAndOrderData[3];
        var reviews=userAndOrderData[4];
        return q.all([
            User.findOne({name: "Anne B."}).exec().then(function(user) {
                user.orders.push(orders[0]);
                user.save();
                return user;
            }),
            User.findOne({name: "Bob J."}).exec().then(function(user) {
                user.orders.push(orders[1]);
                user.save();
                return user;
            }),
            Order.findOne({purchaseDate: "2015-04-20"}).exec().then(function(order) {
                order.products.push({quantity: 1, product:products[0]});
                order.save();
                return order;
            }),
            Order.findOne({purchaseDate: "2015-04-16"}).exec().then(function(order) {
                order.products.push();
                order.save();
                return order;
            }),
            Product.findOne({name: "FSA T"}).exec().then(function(product) {
                product.stock.push(stock[0]);
                product.reviews.push(reviews[0]);
                product.save();
                return product;
            }),
            Product.findOne({name: "Nimit T"}).exec().then(function(product) {
                product.stock.push(stock[1]);
                product.stock.push(stock[2]);
                product.stock.push(stock[3]);
                product.reviews.push(reviews[1]);
                product.save();
                return product;
            }),
            Review.findOne({stars: 5}).exec().then(function(review) {
                review.user=users[0]._id;
                review.save();
                return review;
            }),
            Review.findOne({stars:3}).exec().then(function(review) {
                review.user=users[1]._id;
                review.save();
                return review;
            })
            
        ]);
    }).then(function (userData) {
        console.log(userData);
    }).then(function () {
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
    });

});

// --------------------------------------------------------------

// Production tasks
// --------------------------------------------------------------

gulp.task('buildCSSProduction', function () {
    return gulp.src('./browser/scss/main.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public'));
});

gulp.task('buildJSProduction', function () {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('buildProduction', ['buildCSSProduction', 'buildJSProduction']);

// --------------------------------------------------------------

// Composed tasks
// --------------------------------------------------------------

gulp.task('build', function () {
    if (process.env.NODE_ENV === 'production') {
        runSeq(['buildJSProduction', 'buildCSSProduction']);
    } else {
        runSeq(['buildJS', 'buildCSS']);
    }
});

gulp.task('default', function () {

    livereload.listen();
    gulp.start('build');

    gulp.watch('browser/js/**', function () {
        runSeq('lintJS', 'buildJS', ['testBrowserJS', 'reload']);
    });

    gulp.watch('browser/scss/**', function () {
        runSeq('buildCSS', 'reloadCSS');
    });

    gulp.watch('server/**/*.js', ['lintJS']);
    gulp.watch(['browser/**/*.html', 'server/app/views/*.html'], ['reload']);
    gulp.watch(['tests/server/**/*.js', 'server/**/*.js'], ['testServerJS']);
    gulp.watch('tests/browser/**/*', ['testBrowserJS']);

});